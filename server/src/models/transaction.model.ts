import mongoose, { Document, Schema, Types } from "mongoose";

interface Transaction extends Document {
  userId: Types.ObjectId;
  description: string;
  paymentType: "cash" | "card";
  category: string;
  amount: number;
  location: string;
  date: Date;
}

const transactionSchema: Schema = new Schema<Transaction>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["cash", "card"],
      required: true,
    },
    category: {
      type: String,
      enum: ["saving", "expense", "investment"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      default: "unknown",
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const TransactionModel = mongoose.model<Transaction>(
  "Transaction",
  transactionSchema
);

export default TransactionModel;
