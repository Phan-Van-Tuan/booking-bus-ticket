import { Router } from "express";
import {
  bookTicket,
  getUserTickets,
  cancelTicket,
} from "../controllers/booking.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

// Đặt vé
router.post("/book", authenticate, bookTicket);

// Lấy danh sách vé của người dùng
router.get("/", authenticate, getUserTickets);

// Hủy vé
router.delete("/:id", authenticate, cancelTicket);

export default router;
