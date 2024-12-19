import { NextFunction, Request, Response } from "express";
import {
  getUserById,
  login,
  register,
  updateUser,
} from "../services/user.service";

// Lấy thông tin cá nhân của người dùng
export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id; // `req.user` được gắn từ middleware `authenticate`
    const user = await getUserById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "", data: { user } });
  } catch (error) {
    next(error);
  }
};

// Cập nhật thông tin cá nhân của người dùng
export const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id; // `req.user` được gắn từ middleware `authenticate`
    const updatedUser = await updateUser(userId, req.body);
    res.status(200).json({ message: "", data: { user: updatedUser } });
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await register(req.body);
    res.status(201).json({
      message: "",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await login(email, password);
    res.status(200).json({
      message: "Login successfully",
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
};
