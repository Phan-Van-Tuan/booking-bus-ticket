import { Router } from "express";
import {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
} from "../controllers/trip.controller";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware";

const router = Router();

// Lấy danh sách chuyến xe
router.get("/", getTrips);

// Lấy thông tin chuyến xe theo ID
router.get("/:id", getTripById);

// Thêm mới chuyến xe (Admin)
router.post("/", authenticate, authorizeAdmin, createTrip);

// Cập nhật thông tin chuyến xe (Admin)
router.put("/:id", authenticate, authorizeAdmin, updateTrip);

// Xóa chuyến xe (Admin)
router.delete("/:id", authenticate, authorizeAdmin, deleteTrip);

export default router;
