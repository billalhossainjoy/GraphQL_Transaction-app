import { z } from "zod";

export const TransactionSchema = z.object({
  description: z.string().min(1, "This field is required."),
  paymentType: z.enum(["cash", "card"]),
  category: z.enum(["saving", "expense", "investment"]),
  amount: z.number().default(0),
  date: z.date(),
  location: z.string().min(1, "This field is required."),
});

export const UpdateTransactionSchema = TransactionSchema.partial().extend({
  transactionId: z.string(),
});

export type TransactionType = z.infer<typeof TransactionSchema> & {
  userId?: string;
};

export type UpdatedTransactionType = z.infer<typeof UpdateTransactionSchema>;
