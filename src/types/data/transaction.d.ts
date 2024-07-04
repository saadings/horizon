type Category = "Food and Drink" | "Travel" | "Transfer";

interface Transaction {
  id: string;
  $id: string;
  name: string;
  paymentChannel: string;
  type: string;
  accountId: string;
  amount: number;
  pending: boolean;
  category: string;
  date: string;
  image: string;
  type: string;
  $createdAt: string;
  paymentChannel: string;
  senderBankId: string;
  receiverBankId: string;
}
