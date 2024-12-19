import { Request, Response, NextFunction } from "express";
import {
  createBuses,
  deleteBusById,
  getAllBuses,
  getAllStation,
  getBusById,
  getStationByCode,
  updateBusById,
} from "../services/site.service";

// Lấy danh sách chuyến xe
export const getStations = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stations = getAllStation();
    res.status(200).json({
      message: "",
      data: { stations },
    });
  } catch (error) {
    next(error);
  }
};

export const getStation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const station = getStationByCode(req.params.code);
    res.status(200).json({
      message: "",
      data: { station },
    });
  } catch (error) {
    next(error);
  }
};

// 1. Lấy danh sách xe
export async function getBuses(req: Request, res: Response): Promise<void> {
  try {
    const buses = await getAllBuses();
    res.status(200).json({
      message: "",
      data: { buses },
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách xe", error });
  }
}

// 2. Lấy thông tin xe theo ID
export async function getBus(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const bus = await getBusById(id);
    if (!bus) {
      res.status(404).json({ message: "Không tìm thấy xe" });
    } else {
      res.status(200).json({
        message: "",
        data: bus,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy thông tin xe", error });
  }
}

// 3. Thêm xe mới
export async function createBus(req: Request, res: Response): Promise<void> {
  try {
    const busData = req.body;
    const newBus = await createBuses(busData);
    res.status(201).json({
      message: "",
      data: newBus,
    });
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi thêm xe mới", error });
  }
}

// 4. Cập nhật thông tin xe
export async function updateBus(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedBus = await updateBusById(id, updateData);
    if (!updatedBus) {
      res.status(404).json({ message: "Không tìm thấy xe để cập nhật" });
    } else {
      res.status(200).json({
        message: "",
        data: updatedBus,
      });
    }
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi cập nhật thông tin xe", error });
  }
}

// 5. Xóa xe
export async function deleteBus(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const deletedBus = await deleteBusById(id);
    if (!deletedBus) {
      res.status(404).json({ message: "Không tìm thấy xe để xóa" });
    } else {
      res
        .status(200)
        .json({ message: "Đã xóa xe thành công", data: deletedBus });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa xe", error });
  }
}
