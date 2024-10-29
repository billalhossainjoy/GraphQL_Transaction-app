import mongoose, { Schema } from "mongoose";

export interface UserDocument extends Document {
  _id: string;
  username: string;
  name: string;
  password: string;
  profilePicture: string;
  gender: "male" | "female" | "other";
  refreshToken: string;
}

declare global {
  namespace Express {
    interface User extends UserDocument {}
  }
}

const userSchema: Schema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
