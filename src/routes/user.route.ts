import { Router } from "express";
import {
  getUserProfile,
<<<<<<< HEAD
  loginUser,
  registerUser,
=======
>>>>>>> 37da2e9888ed0f5bff3895bfee6b5463319527c2
  updateUserProfile,
} from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

<<<<<<< HEAD
// Đăng ký tài khoản
router.post("/register", registerUser);

// Đăng nhập
router.post("/login", loginUser);

=======
>>>>>>> 37da2e9888ed0f5bff3895bfee6b5463319527c2
// Lấy thông tin người dùng
router.get("/profile", authenticate, getUserProfile);

// Cập nhật thông tin người dùng
router.put("/profile", authenticate, updateUserProfile);

export default router;
