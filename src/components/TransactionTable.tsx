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
    <div
      className={cn(
        "category-badge space-x-0.5",
        borderColor,
        chipBackgroundColor,
      )}
    >
      <div className={cn("size-2 rounded-full", backgroundColor)}></div>
      <p className={cn("text-12 category font-medium", textColor)}>
        {category}
      </p>
    </div>
  );
};

const TransactionTable = ({ transactions }: TransactionTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg c-lg:w-[calc(100vw-723px)]">
      <Table>
        <TableHeader className="bg-[#f9fafb] dark:bg-slate-800">
          <TableRow className="font-bold dark:border-b-slate-500">
            <TableHead className="px-2">Transaction</TableHead>
            <TableHead className="px-2">Amount</TableHead>
            <TableHead className="px-2">Status</TableHead>
            <TableHead className="px-2">Date</TableHead>
            <TableHead className="px-2">Channel</TableHead>
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
                  isDebit || amount[0] === "-"
                    ? "bg-[#fffbfa] dark:bg-slate-800"
                    : "bg-[#f6fef9] dark:bg-slate-800",
                  "!over:bg-none !border-b-DEFAULT dark:border-b-slate-900",
                )}
              >
                <TableCell className="max-w-[250px] pl-2 pr-10">
                  <div className="flex items-center gap-3">
                    <h1 className="text-14 truncate font-semibold text-[#344054] dark:text-white">
                      {removeSpecialCharacters(transaction.name)}
                    </h1>
                  </div>
                </TableCell>
                <TableCell
                  className={cn(
                    "pl-2 pr-10 font-semibold",
                    isDebit || amount[0] === "-"
                      ? "text-red-500 dark:text-red-400"
                      : "text-green-500 dark:text-green-400",
                  )}
                >
                  {isDebit ? `-${amount}` : isCredit ? amount : amount}
                </TableCell>

                <TableCell className="pl-2 pr-10">
                  <CategoryBadge category={status} />
                </TableCell>

                <TableCell className="line-clamp-1 min-w-32 truncate pl-2 pr-10 text-black-3 dark:text-white">
                  {formatDateTime(new Date(transaction.date)).dateTime}
                </TableCell>

                <TableCell className="min-w-24 pl-2 pr-10 capitalize">
                  {transaction.paymentChannel}
                </TableCell>

                <TableCell className="pl-2 pr-10 max-md:hidden">
                  <CategoryBadge category={transaction.category} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
