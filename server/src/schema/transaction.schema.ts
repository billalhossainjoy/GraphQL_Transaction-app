import { z } from "zod";

export const TransactionSchema = z.object({
  description: z.string(),
  paymentType: z.enum(["cash", "card"]),
  category: z.enum(["saving", "expense", "investment"]),
  amount: z.number(),
  date: z.string(),
  location: z.string(),
});

export const UpdateTransactionSchema = TransactionSchema.partial().extend({
  transactionId: z.string(),
});

export type TransactionType = z.infer<typeof TransactionSchema> & {
  userId?: string;
};

export type UpdatedTransactionType = z.infer<typeof UpdateTransactionSchema>;
