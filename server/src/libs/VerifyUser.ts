import { Request } from "express";
import { verifyToken } from "../utils/jwt";
import { JWT_ACCESS_SECRET_KEY } from "../config/env";
import UserModel from "../models/user.model";

export const VerifyUser = async (req: Request) => {
  try {
    const token = req.headers.access_token || req.cookies.access_token;
    if (!token) return undefined;

    const user = verifyToken(token as string, JWT_ACCESS_SECRET_KEY);

    return await UserModel.findById(user._id);
  } catch (error) {
    throw error;
  }
};
