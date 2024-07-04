namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SITE_URL: string;

    NEXT_PUBLIC_APPWRITE_ENDPOINT: string;
    NEXT_PUBLIC_APPWRITE_PROJECT: string;
    APPWRITE_DATABASE_ID: string;
    APPWRITE_USER_COLLECTION_ID: string;
    APPWRITE_BANK_COLLECTION_ID: string;
    APPWRITE_TRANSACTION_COLLECTION_ID: string;
    NEXT_APPWRITE_KEY: string;

    PLAID_CLIENT_ID: string;
    PLAID_SECRET: string;
    PLAID_ENV: string;
    PLAID_PRODUCTS: string;
    PLAID_COUNTRY_CODES: string;

    DWOLLA_KEY: string;
    DWOLLA_SECRET: string;
    DWOLLA_BASE_URL: string;
    DWOLLA_ENV: string;

    DUMMY_ACCESS_TOKEN: string;
    DUMMY_ACCOUNT_ID: string;
    DUMMY_FUNDING_ACCOUNT_ID: string;
  }
}
