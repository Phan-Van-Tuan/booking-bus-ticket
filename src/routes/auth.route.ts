import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";

const router = Router();

// Đăng ký tài khoản
router.post("/register", registerUser);

// Đăng nhập
router.post("/login", loginUser);

export default router;
