export const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/icons/dollar-circle.svg",
    route: "/my-banks",
    label: "My Banks",
  },
  {
    imgURL: "/icons/transaction.svg",
    route: "/transaction-history",
    label: "Transaction History",
  },
  {
    imgURL: "/icons/money-send.svg",
    route: "/payment-transfer",
    label: "Transfer Funds",
  },
];

export const topCategoryStyles = {
  "Food and Drink": {
    bg: "bg-blue-25 dark:bg-slate-800",
    circleBg: "bg-blue-100",
    text: {
      main: "text-blue-900 dark:text-blue-500",
      count: "text-blue-700 dark:text-blue-500",
    },
    progress: {
      bg: "bg-blue-100",
      indicator: "bg-blue-700",
    },
    icon: "/icons/monitor.svg",
  },
  Travel: {
    bg: "bg-success-25 dark:bg-slate-800",
    circleBg: "bg-success-100",
    text: {
      main: "text-success-900 dark:text-green-500",
      count: "text-success-700 dark:text-green-500",
    },
    progress: {
      bg: "bg-success-100",
      indicator: "bg-success-700",
    },
    icon: "/icons/coins.svg",
  },
  Transfer: {
    bg: "bg-yellow-25 dark:bg-slate-800",
    circleBg: "bg-yellow-100",
    text: {
      main: "text-yellow-900 dark:text-yellow-500",
      count: "text-yellow-700 dark:text-yellow-500",
    },
    progress: {
      bg: "bg-yellow-100",
      indicator: "bg-yellow-700",
    },
    icon: "/icons/arrow-right.svg",
  },
  default: {
    bg: "bg-pink-25 dark:bg-slate-800",
    circleBg: "bg-pink-100",
    text: {
      main: "text-pink-900 dark:text-pink-500",
      count: "text-pink-700 dark:text-pink-500",
    },
    progress: {
      bg: "bg-pink-100",
      indicator: "bg-pink-700",
    },
    icon: "/icons/shopping-bag.svg",
  },
};

export const transactionCategoryStyles = {
  "Food and Drink": {
    borderColor: "border-pink-600",
    backgroundColor: "bg-pink-500",
    textColor: "text-pink-700",
    chipBackgroundColor: "bg-inherit",
  },
  Payment: {
    borderColor: "border-success-600",
    backgroundColor: "bg-green-600",
    textColor: "text-success-700",
    chipBackgroundColor: "bg-inherit",
  },
  "Bank Fees": {
    borderColor: "border-success-600",
    backgroundColor: "bg-green-600",
    textColor: "text-success-700",
    chipBackgroundColor: "bg-inherit",
  },
  Transfer: {
    borderColor: "border-red-700",
    backgroundColor: "bg-red-700",
    textColor: "text-red-700",
    chipBackgroundColor: "bg-inherit",
  },
  Processing: {
    borderColor: "border-[#F2F4F7]",
    backgroundColor: "bg-gray-500",
    textColor: "text-[#344054]",
    chipBackgroundColor: "bg-[#F2F4F7]",
  },
  Success: {
    borderColor: "border-[#12B76A]",
    backgroundColor: "bg-[#12B76A]",
    textColor: "text-[#027A48]",
    chipBackgroundColor: "bg-[#ECFDF3]",
  },
  Travel: {
    borderColor: "bg-[#0047AB] dark:border-blue-500",
    backgroundColor: "bg-blue-700 dark:bg-blue-500",
    textColor: "text-blue-700 dark:text-blue-500",
    chipBackgroundColor: "bg-inherit",
  },
  default: {
    borderColor: "",
    backgroundColor: "bg-blue-500",
    textColor: "text-blue-700",
    chipBackgroundColor: "bg-inherit",
  },
};
