import { Router } from "express";
import {
  createBus,
  deleteBus,
  getBus,
  getBuses,
  getStation,
  getStations,
  updateBus,
} from "../controllers/site.controller";
const router = Router();

// Lấy danh sách bến
router.get("/station/", getStations);
router.get("/station/:code", getStation);

router.get("/bus/", getBuses); // Lấy danh sách xe
router.get("/bus/:id", getBus); // Lấy thông tin xe theo ID
router.post("/bus/", createBus); // Thêm xe mới
router.put("/bus/:id", updateBus); // Cập nhật thông tin xe
router.delete("/bus/:id", deleteBus); // Xóa xe

export default router;
