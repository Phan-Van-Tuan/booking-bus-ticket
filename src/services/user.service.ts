import mongoose from "mongoose";
import User, { IUser } from "../models/user.model";

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
