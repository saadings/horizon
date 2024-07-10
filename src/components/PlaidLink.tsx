import { PlaidLinkVariant } from "@/enums/plaidLink";
import {
  createLinkToken,
  exchangePublicToken,
} from "@/lib/actions/userActions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();

  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);

      setToken(data?.linkToken);
    };

    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({
        publicToken: public_token,
        user,
      });

      setLoading(false);
      router.push("/");
    },
    [user, router],
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  const handleOpen = () => {
    if (!ready) {
      return;
    }

    setLoading(true);
    open();
  };

  return (
    <>
      {variant === PlaidLinkVariant.PRIMARY ? (
        <Button
          onClick={handleOpen}
          disabled={!ready}
          className="plaidlink-primary"
        >
          {loading ? (
            <Loader2 size={24} className="animate-spin" />
          ) : (
            "Connect bank"
          )}
        </Button>
      ) : variant === PlaidLinkVariant.GHOST ? (
        <Button
          onClick={handleOpen}
          variant="ghost"
          className="plaidlink-ghost"
        >
          <Image
            src="/icons/connect-bank.svg"
            alt="connect bank"
            width={24}
            height={24}
          />
          <p className="text-[16px] font-semibold text-black-2 dark:text-gray-500 xl:block">
            Connect bank
          </p>
        </Button>
      ) : (
        <Button onClick={handleOpen} className="plaidlink-default">
          <Image
            src="/icons/connect-bank.svg"
            alt="connect bank"
            width={24}
            height={24}
          />
          <p className="text-[16px] font-semibold text-black-2 dark:text-gray-500 max-xl:hidden">
            Connect bank
          </p>
        </Button>
      )}
    </>
  );
};

export default PlaidLink;
