import { PlaidLinkVariant } from "@/enums/plaidLink";
import { Button } from "./ui/button";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createLinkToken,
  exchangePublicToken,
} from "@/lib/actions/userActions";
import Image from "next/image";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();

  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
    };

    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({ publicToken: public_token, user });
      router.push("/");
    },
    [user, router],
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  const handlePlaidLinkOpen = () => {
    open();
  };

  return (
    <>
      {variant === PlaidLinkVariant.PRIMARY ? (
        <Button
          disabled={!ready}
          className="plaidlink-primary"
          onClick={handlePlaidLinkOpen}
        >
          Connect Bank
        </Button>
      ) : variant === PlaidLinkVariant.GHOST ? (
        <Button
          variant="ghost"
          onClick={handlePlaidLinkOpen}
          className="plaidlink-ghost"
        >
          <Image
            src={"/icons/connect-bank.svg"}
            alt="connect bank"
            width={24}
            height={24}
          />
          <p className="text-[16px] font-semibold text-black-2 dark:text-gray-500">
            Connect Bank
          </p>
        </Button>
      ) : (
        <Button
          className="plaidlink-default px-3"
          onClick={handlePlaidLinkOpen}
        >
          <Image
            src={"/icons/connect-bank.svg"}
            alt="connect bank"
            width={24}
            height={24}
          />
          <p className="text-[16px] font-semibold text-black-2 dark:text-gray-500 max-xl:hidden">
            Connect Bank
          </p>
        </Button>
      )}
    </>
  );
};

export default PlaidLink;
