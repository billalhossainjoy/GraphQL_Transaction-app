import jwt, {
  DecodeOptions,
  JwtPayload,
  Secret,
  SignOptions,
} from "jsonwebtoken";

export const verifyToken = (
  token: string,
  secret: Secret,
  option?: DecodeOptions
) => {
  try {
    return jwt.verify(token, secret, option) as JwtPayload;
  } catch (error) {
    throw error;
  }
};

export const generateToken = (
  payload: any,
  secret: Secret,
  options: SignOptions
) => {
  return jwt.sign(payload, secret, options);
};
