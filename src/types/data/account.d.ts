type AccountTypes = "depository" | "credit" | "loan " | "investment" | "other";

interface Account {
  id: string;
  availableBalance: number;
  currentBalance: number;
  institutionId: any;
  name: string;
  officialName: string | null;
  mask: string;
  type: string;
  subtype: string;
  appwriteItemId: string;
  shareableId: string;
}
