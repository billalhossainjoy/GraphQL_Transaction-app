interface Transaction {
  id: string;
  userId: string;
  description: string;
  paymentType: "cash" | "card";
  category: "saving" | "expense" | "investment";
  amount: number;
  location: string;
  date: string;
  __typename: string;
}
