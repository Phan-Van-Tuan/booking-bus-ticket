import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User, { IUser } from "../models/user.model";
import { config } from "../config/env";
import { generateToken } from "../utils/jwt";


// Lấy thông tin người dùng theo ID
export const getUserById = async (
  userId: mongoose.Types.ObjectId
): Promise<IUser | null> => {
  return User.findById(userId).select("-password"); // Không trả về mật khẩu
};

// Cập nhật thông tin người dùng
export const updateUser = async (
  userId: mongoose.Types.ObjectId,
  updateData: Partial<IUser>
): Promise<IUser | null> => {
  return User.findByIdAndUpdate(userId, updateData, { new: true }).select(
    "-password"
  );
};

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

