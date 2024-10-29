import {
  JWT_ACCESS_SECRET_KEY,
  JWT_ACCESS_SECRET_EXPIRY,
  JWT_REFRESH_SECRET_KEY,
  JWT_REFRESH_SECRET_EXPIRY,
} from "../config/env";
import { UserDocument } from "../models/user.model";
import { generateToken } from "../utils/jwt";

export const GenerateAccessRefreshToken = (user: UserDocument) => {
  try {
    const payload = {
      _id: user._id,
      username: user.username,
      gender: user.gender,
    };

    const accessToken = generateToken(payload, JWT_ACCESS_SECRET_KEY, {
      expiresIn: JWT_ACCESS_SECRET_EXPIRY,
    });

    const refreshToken = generateToken(
      { _id: user._id },
      JWT_REFRESH_SECRET_KEY,
      {
        expiresIn: JWT_REFRESH_SECRET_EXPIRY,
      }
    );

    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};
