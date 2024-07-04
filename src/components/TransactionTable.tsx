import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { transactionCategoryStyles } from "@/constants";
import {
  cn,
  formatAmount,
  formatDateTime,
  getTransactionStatus,
  removeSpecialCharacters,
} from "@/lib/utils";

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const { borderColor, backgroundColor, textColor, chipBackgroundColor } =
    transactionCategoryStyles[
      category as keyof typeof transactionCategoryStyles
    ] || transactionCategoryStyles.default;

  return (
    <div className={cn("category-badge", borderColor, chipBackgroundColor)}>
      <div className={cn("size-2 rounded-full", backgroundColor)}></div>
      <p className={cn("text-12 category font-medium", textColor)}></p>
    </div>
  );
};

const TransactionTable = ({ transactions }: TransactionTableProps) => {
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader className="bg-[#f9fafb] dark:bg-gray-900">
        <TableRow>
          <TableHead className="px-2">Transaction</TableHead>
          <TableHead className="px-2">Amount</TableHead>
          <TableHead className="px-2">Status</TableHead>
          <TableHead className="px-2">Date</TableHead>
          <TableHead className="px-2 max-md:hidden">Channel</TableHead>
          <TableHead className="px-2 max-md:hidden">Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => {
          const status = getTransactionStatus(new Date(transaction.date));
          const amount = formatAmount(transaction.amount);
          const isDebit = transaction.type === "debit";
          const isCredit = transaction.type === "credit";

          return (
            <TableRow
              key={transaction.id}
              className={cn(
                isDebit || amount[0] === "-" ? "bg-[#fffbfa]" : "bg-[#f6fef9]",
                "!over:bg-none !border-b-DEFAULT",
              )}
            >
              <TableCell className="max-w-[250px] pl-2 pr-10">
                <div className="flex items-center gap-3">
                  <h1 className="text-14 truncate font-semibold text-[#344054]">
                    {removeSpecialCharacters(transaction.name)}
                  </h1>
                </div>
              </TableCell>
              <TableCell
                className={cn(
                  "pl-2 pr-10 font-semibold",
                  isDebit || amount[0] === "-"
                    ? "text-red-300 dark:text-red-200"
                    : "text-green-300 dark:text-green-200",
                )}
              >
                {isDebit ? `-${amount}` : isCredit ? amount : amount}
              </TableCell>

              <TableCell className="pl-2 pr-10">
                <CategoryBadge category={status} />
              </TableCell>

              <TableCell className="min-w-32 pl-2 pr-10">
                {formatDateTime(new Date(transaction.date)).dateTime}
              </TableCell>

              <TableCell className="min-w-24 pl-2 pr-10 capitalize">
                {transaction.channel}
              </TableCell>

              <TableCell className="pl-2 pr-10 max-md:hidden">
                <CategoryBadge category={transaction.category} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
