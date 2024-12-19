import { Router } from "express";
import {
  getUserProfile,
  loginUser,
  registerUser,
  updateUserProfile,
} from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

// Đăng ký tài khoản
router.post("/register", registerUser);

// Đăng nhập
router.post("/login", loginUser);

// Lấy thông tin người dùng
router.get("/profile", authenticate, getUserProfile);

// Cập nhật thông tin người dùng
router.put("/profile", authenticate, updateUserProfile);

export default router;
