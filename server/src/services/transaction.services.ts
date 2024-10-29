import TransactionModel from "../models/transaction.model";
import { UserDocument } from "../models/user.model";
import {
  TransactionType,
  UpdatedTransactionType,
} from "../schema/transaction.schema";

class TransactionService {
  private static async find(id: string) {
    try {
      const transactions = await TransactionModel.findById(id);
      return transactions;
    } catch (error) {
      throw error;
    }
  }
  static async createTransaction(user: UserDocument, input: TransactionType) {
    try {
      const transaction = await TransactionModel.create({
        userId: user._id,
        ...input,
      });
      return transaction;
    } catch (error) {
      throw error;
    }
  }
  static async updateTransaction(input: UpdatedTransactionType) {
    try {
      const transaction = await TransactionModel.findByIdAndUpdate(
        input.transactionId,
        {
          ...input,
        },
        { new: true }
      );
      return transaction;
    } catch (error) {
      throw error;
    }
  }
  static async deleteTransaction(id: string) {
    try {
      if (!id) throw new Error("Invalid transaction ID");
      const transaction = await this.find(id);
      if (!transaction) throw new Error("Transaction not found");

      const deletedTransaction = await TransactionModel.findByIdAndDelete(id);

      if (!deletedTransaction) throw new Error("Deletion Failed");
      return deletedTransaction;
    } catch (error) {
      throw error;
    }
  }
}
export default TransactionService;
