import PaymentTransferForm from "@/components/Forms/PaymentTransferForm";
import HeaderBox from "@/components/HeaderBox";
import { getAccounts } from "@/lib/actions/bankActions";
import { getLoggedInUser } from "@/lib/actions/userActions";
import { redirect } from "next/navigation";
import React from "react";

const PaymentTransfer = async () => {
  const loggedIn = await getLoggedInUser();

  const accounts = await getAccounts({ userId: loggedIn?.$id! });

  const accountsData = accounts?.data;

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
