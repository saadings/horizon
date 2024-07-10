"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ID, Query } from "node-appwrite";
import {
  CountryCode,
  LinkTokenCreateRequest,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";
import { plaidClient } from "../plaid";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import { addFundingSource, createDwollaCustomer } from "./dwollaActions";

const {
  APPWRITE_DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID,
} = process.env;

export const getUserInfo = async ({ userId }: GetUserInfoProps) => {
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(
      APPWRITE_DATABASE_ID,
      APPWRITE_USER_COLLECTION_ID,
      [Query.equal("userId", [userId])],
    );

    return parseStringify(user.documents[0]);
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An Unknown Error Occurred",
    );
  }
};

export const signIn = async ({ email, password }: SignInProps) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const user = await getUserInfo({ userId: session.userId });

    return parseStringify(user);
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An Unknown Error Occurred",
    );
  }
};

export const signUp = async ({ password, ...userData }: SignUpParams) => {
  let newUserAccount;
  const { email, firstName, lastName } = userData;

  try {
    const { account, database } = await createAdminClient();

    newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`,
    );

    if (!newUserAccount) throw new Error("Error creating user account");

    const dwollaCustomerUrl = await createDwollaCustomer({
      ...userData,
      type: "personal",
    });

    if (!dwollaCustomerUrl) throw new Error("Error creating Dwolla customer");

    const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

    const newUser = await database.createDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_USER_COLLECTION_ID,
      ID.unique(),
      {
        ...userData,
        userId: newUserAccount.$id,
        dwollaCustomerId,
        dwollaCustomerUrl,
      },
    );

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUser);
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An Unknown Error Occurred",
    );
  }
};

export const signOut = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete("appwrite-session");

    await account.deleteSession("current");
  } catch (error) {
    return null;
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();

    const result = await account.get();

    const user = await getUserInfo({ userId: result.$id });

    return parseStringify(user) as User;
  } catch (error) {
    return null;
  }
}

export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id,
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products: ["auth"] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
    } satisfies LinkTokenCreateRequest;

    const response = await plaidClient.linkTokenCreate(tokenParams);

    return parseStringify({
      linkToken: response.data.link_token,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An Unknown Error Occurred",
    );
  }
};

export const createBankAccount = async ({
  userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  shareableId,
}: CreateBankAccountProps) => {
  try {
    const { database } = await createAdminClient();

    const bankAccount = await database.createDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_BANK_COLLECTION_ID,
      ID.unique(),
      {
        userId,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        shareableId,
      },
    );

    return parseStringify(bankAccount);
  } catch (error) {}
};

// This function exchanges a public token for an access token and item ID
export const exchangePublicToken = async ({
  publicToken,
  user,
}: ExchangePublicTokenProps) => {
  try {
    // Exchange public token for access token and item ID
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    // Get account information from Plaid using the access token
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountsResponse.data.accounts[0];

    // Create a processor token for Dwolla using the access token and account ID
    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };

    const processorTokenResponse =
      await plaidClient.processorTokenCreate(request);

    const processorToken = processorTokenResponse.data.processor_token;

    // Create a funding source URL for the account using the Dwolla customer ID, processor token, and bank name
    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });

    // If the funding source URL is not created, throw an error
    if (!fundingSourceUrl) throw new Error("Error creating funding source");

    // Create a bank account using the user ID, item ID, account ID, access token, funding source URL, and shareable ID
    const newBankAccount = await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      shareableId: encryptId(accountData.account_id),
    });

    // If the bank account is not created, throw an error
    if (!newBankAccount) throw new Error("Error creating bank account");

    // Revalidate the path to reflect the changes
    revalidatePath("/");

    // Return a success message
    return parseStringify({
      publicTokenExchange: "complete",
    });
  } catch (error) {
    // Log any errors that occur during the process
    console.error("An error occurred while creating exchanging token:", error);
  }
};

export const getBanks = async ({ userId }: GetBanksProps) => {
  try {
    const { database } = await createAdminClient();

    const banks = await database.listDocuments(
      APPWRITE_DATABASE_ID,
      APPWRITE_BANK_COLLECTION_ID,
      [Query.equal("userId", [userId])],
    );

    return parseStringify(banks.documents);
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An Unknown Error Occurred",
    );
  }
};

export const getBank = async ({ documentId }: GetBankProps) => {
  try {
    const { database } = await createAdminClient();

    const bank = await database.listDocuments(
      APPWRITE_DATABASE_ID,
      APPWRITE_BANK_COLLECTION_ID,
      [Query.equal("$id", [documentId])],
    );

    return parseStringify(bank.documents[0]);
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An Unknown Error Occurred",
    );
  }
};

// get specific bank from bank collection by account id
export const getBankByAccountId = async ({
  accountId,
}: GetBankByAccountIdProps) => {
  try {
    const { database } = await createAdminClient();

    const bank = await database.listDocuments(
      APPWRITE_DATABASE_ID,
      APPWRITE_BANK_COLLECTION_ID,
      [Query.equal("accountId", [accountId])],
    );

    if (bank.total !== 1) return null;

    return parseStringify(bank.documents[0]);
  } catch (error) {
    console.error("Error", error);
    return null;
  }
};
