import { Request, Response } from "express";
import { VerifyUser } from "./VerifyUser";

export interface GraphqlContext {
  req: Request;
  res: Response;
  User?: Express.User | null;
}

interface ContextPerameter {
  req: Request;
  res: Response;
}

export const CreateContext = async ({
  req,
  res,
}: ContextPerameter): Promise<GraphqlContext> => {
  const User = await VerifyUser(req);
  return {
    req,
    res,
    User,
  };
};
