import UserModel from "../models/user.model";
import {
  LoginSchema,
  LoginSchemaType,
  SignUpSchema,
  SignUpSchemaType,
} from "../schema/user.schema";
import bcrypt from "bcryptjs";

interface Find {
  id?: string;
  username?: string;
}

class UserService {
  protected static async findUser({ id, username }: Find) {
    let user;
    try {
      if (id) user = await UserModel.findById(id);
      else user = await UserModel.findOne({ username });
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async signup(input: SignUpSchemaType) {
    try {
      await UserModel.deleteMany();
      const { username, name, password, gender } = SignUpSchema.parse(input);

      const existingUser = await this.findUser({ username });
      if (existingUser) throw new Error("User already exists");

      const hashedPassword = await bcrypt.hash(password as string, 10);
      const user = await UserModel.create({
        username,
        name,
        password: hashedPassword,
        gender,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
  static async login(input: LoginSchemaType) {
    try {
      const { username, password } = LoginSchema.parse(input);
      const user = await this.findUser({ username });
      if (!user) throw new Error("User not found");

      const isMatch = await bcrypt.compare(password as string, user.password);
      if (!isMatch) throw new Error("Invalid password");

      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
