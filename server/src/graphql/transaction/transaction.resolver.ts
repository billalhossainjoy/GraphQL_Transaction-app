import { GraphqlContext } from "../../libs/CreateContext";
import TransactionModel from "../../models/transaction.model";
import UserModel from "../../models/user.model";
import {
  TransactionSchema,
  TransactionType,
  UpdateTransactionSchema,
} from "../../schema/transaction.schema";
import TransactionService from "../../services/transaction.services";

export const transactionResolver = {
  Query: {
    transactions: async (_: any, __: any, { User }: GraphqlContext) => {
      try {
        if (!User) throw new Error("UnauthorizedUser");

        return await TransactionModel.find({ userId: User._id });
      } catch (error) {
        throw error;
      }
    },

    transaction: async (
      _: any,
      { transactionId }: any,
      { User }: GraphqlContext
    ) => {
      try {
        if (!User) throw new Error("UnauthorizedUser");
        const transaction = await TransactionModel.findById(transactionId);
        if (!transaction) throw new Error("Transaction not found");

        return transaction;
      } catch (error) {
        throw error;
      }
    },

    categoryStatistics: async (_: any, __: any, { User }: GraphqlContext) => {
      try {
        if (!User) throw new Error("UnauthorizedUser");
      } catch (error) {
        throw error;
      }
    },
  },

  Transaction: {
    user: async ({ userId }: TransactionType) => {
      try {
        if (!userId) throw new Error("Unauthorized User");
        const user = await UserModel.findOne({ _id: userId });
        return user;
      } catch (error) {
        throw error;
      }
    },
  },

  Mutation: {
    createTransaction: async (
      _: any,
      { input }: any,
      { User }: GraphqlContext
    ) => {
      try {
        if (!User) throw new Error("UnauthorizedUser");
        const transaction = TransactionService.createTransaction(
          User,
          TransactionSchema.parse(input)
        );
        return transaction;
      } catch (error) {
        console.log(error);
      }
    },
    updateTransaction: async (
      _: any,
      { input }: any,
      { User }: GraphqlContext
    ) => {
      try {
        if (!User) throw new Error("Unauthorized User");
        const transaction = await TransactionService.updateTransaction(
          UpdateTransactionSchema.parse(input)
        );
        return transaction;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    deleteTransaction: async (
      _: any,
      { transactionId }: { transactionId: string },
      { User }: GraphqlContext
    ) => {
      const deletedTransaction = await TransactionService.deleteTransaction(
        transactionId
      );

      return deletedTransaction;
    },
  },
};
