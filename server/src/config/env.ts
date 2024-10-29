import dotenv from "dotenv";
dotenv.config();

const env = {
  MONGO_URI: process.env.MONGO_URI!,
  JWT_ACCESS_SECRET_KEY: process.env.JWT_ACCESS_SECRET_KEY!,
  JWT_ACCESS_SECRET_EXPIRY: process.env.JWT_ACCESS_SECRET_EXPIRY!,
  JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY!,
  JWT_REFRESH_SECRET_EXPIRY: process.env.JWT_REFRESH_SECRET_EXPIRY!,
};

export const {
  MONGO_URI,
  JWT_ACCESS_SECRET_KEY,
  JWT_ACCESS_SECRET_EXPIRY,
  JWT_REFRESH_SECRET_KEY,
  JWT_REFRESH_SECRET_EXPIRY,
} = env;