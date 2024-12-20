import User, { IUser } from "../models/user.model";
import bcrypt from "bcryptjs";
import { config } from "../configs/env.config";
import { generateToken, decodeToken } from "../utils/jwt";

export const register = async (userData: Partial<IUser>) => {
  const hashedPassword = await bcrypt.hash(userData.password!, config.SALT);
  return User.create({ ...userData, password: hashedPassword });
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken({ id: user._id, role: user.role }, "1d");

  user.password = "";
  return { user, token };
};
