import { Router } from "express";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

// Lấy thông tin người dùng
router.get("/profile", authenticate, getUserProfile);

// Cập nhật thông tin người dùng
router.put("/profile", authenticate, updateUserProfile);

export default router;
