import User, { IUser } from "@models/user.model";
import { omit } from "lodash";

export const createUser = async (
  createUserInput: Omit<IUser, "_id" | "noteCount" | "checkPassword">
) => {
  const user = await User.create(createUserInput);
  return user;
};

export const findUserById = async (id: string) => {
  return await User.findById(id);
};

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const validateEmailAndPassword = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return { user };
  }
  const isValid = await user.checkPassword(password);
  if (!isValid) {
    return { user: null };
  }

  return { user };
};
