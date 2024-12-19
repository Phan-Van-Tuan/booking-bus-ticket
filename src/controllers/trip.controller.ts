import { NextFunction, Request, Response } from "express";
import {
<<<<<<< HEAD
  createTrips,
=======
  createNewTrip,
>>>>>>> 37da2e9888ed0f5bff3895bfee6b5463319527c2
  getAllTrips,
  getTripDetails,
  updateTripById,
  deleteTripById,
} from "../services/trip.service";

// Lấy danh sách chuyến xe
export const getTrips = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const trips = await getAllTrips(req.query);
    res.status(200).json({
      message: "",
      data: trips,
    });
  } catch (error) {
    next(error);
  }
};

// Lấy thông tin chuyến xe theo ID
export const getTripById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const trip = await getTripDetails(req.params.id);
    if (!trip) res.status(404).json({ message: "Trip not found" });
    res.status(200).json({
      message: "",
<<<<<<< HEAD
      data: trip,
=======
      data: { trip },
>>>>>>> 37da2e9888ed0f5bff3895bfee6b5463319527c2
    });
  } catch (error) {
    next(error);
  }
};

// Tạo chuyến xe mới (Admin)
export const createTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
<<<<<<< HEAD
    const trip = await createTrips(req.body);
    res.status(201).json({
      message: "",
      data: trip,
=======
    const trip = await createNewTrip(req.body);
    res.status(201).json({
      message: "",
      data: { trip },
>>>>>>> 37da2e9888ed0f5bff3895bfee6b5463319527c2
    });
  } catch (error) {
    next(error);
  }
};

// Cập nhật thông tin chuyến xe (Admin)
export const updateTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const trip = await updateTripById(req.params.id, req.body);
    if (!trip) res.status(404).json({ message: "Trip not found" });
    res.status(200).json({
      message: "",
<<<<<<< HEAD
      data: trip,
=======
      data: { trip },
>>>>>>> 37da2e9888ed0f5bff3895bfee6b5463319527c2
    });
  } catch (error) {
    next(error);
  }
};

// Xóa chuyến xe (Admin)
export const deleteTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await deleteTripById(req.params.id);
    if (!result) res.status(404).json({ message: "Trip not found" });
    res.status(200).json({
      message: "Trip deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
