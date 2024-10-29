import UserModel from "../../models/user.model";
import UserService from "../../services/user.services";
import { GraphqlContext } from "../../libs/CreateContext";
import { GenerateAccessRefreshToken } from "../../libs/AccessRefreshToken";

export const userResolver = {
  Query: {
    authUser: (_: any, __: any, { User }: GraphqlContext) => {
      if (!User) {
        throw new Error("Unauthorized user.");
      }
      return User;
    },

    users: async () => {
      return await UserModel.find();
    },

    user: async (_: any, { id }: any) => {
      return await UserModel.findById(id);
    },
  },

  Mutation: {
    signUp: async (_: any, { input }: any, { req, res }: GraphqlContext) => {
      const user = await UserService.signup(input);

      const { accessToken, refreshToken } = GenerateAccessRefreshToken(user);

      user.refreshToken = refreshToken;
      await user.save();

      res.header("access_token", accessToken);
      res.header("refresh_token", refreshToken);

      return user;
    },
    login: async (_: any, { input }: any, { req, res }: GraphqlContext) => {
      try {
        const user = await UserService.login(input);

        const { accessToken, refreshToken } = GenerateAccessRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save();

        res.header("access_token", accessToken);
        res.header("refresh_token", refreshToken);
        return user;
      } catch (error) {
        throw error;
      }
    },

    logout: async (_: any, __: any, { User }: GraphqlContext) => {
      if (!User) throw new Error("Unauthorized user.");

      await UserModel.findByIdAndUpdate(User._id, { refreshToken: "" });

      return {
        message: "Logout successfully",
      };
    },
  },
};
