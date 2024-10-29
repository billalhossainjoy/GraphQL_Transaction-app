import { mergeTypeDefs } from "@graphql-tools/merge";
import { transactionSchema } from "./transaction/transaction.schema";
import { userSchema } from "./user/user.schema";

export const typeDefs = mergeTypeDefs([userSchema, transactionSchema]);
