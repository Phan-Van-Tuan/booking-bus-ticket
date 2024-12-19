import { Router } from "express";
import { getStation, getStations } from "../controllers/station.controller";
const router = Router();

// Lấy danh sách bến
router.get("/", getStations);
router.get("/:code", getStation);

export default router;
