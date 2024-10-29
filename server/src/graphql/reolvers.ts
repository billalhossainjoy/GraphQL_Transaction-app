import { transactionResolver } from "./transaction/transaction.resolver";
import { userResolver } from "./user/user.resolver";
import { mergeResolvers } from "@graphql-tools/merge";

export const resolvers = mergeResolvers([userResolver,transactionResolver]);
