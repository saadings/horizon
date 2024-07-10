import PaymentTransferForm from "@/components/Forms/PaymentTransferForm";
import HeaderBox from "@/components/HeaderBox";
import { getAccounts } from "@/lib/actions/bankActions";
import { getLoggedInUser } from "@/lib/actions/userActions";

const PaymentTransfer = async () => {
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) return;

  const accounts = await getAccounts({ userId: loggedIn?.$id! });

  if (!accounts) return;

  const accountsData = accounts?.data;

  if (!accountsData) return;

  return (
    <section className="payment-transfer">
      <HeaderBox
        title="Payment Transfer"
        subtext="Please provide any specific details for the payment transfer."
      />

      <section className="size-full pt-5">
        <PaymentTransferForm accounts={accountsData || []} />
      </section>
    </section>
  );
};

export default PaymentTransfer;
