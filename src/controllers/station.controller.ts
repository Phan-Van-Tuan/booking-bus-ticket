import { Request, Response, NextFunction } from "express";
import { getAllStation, getStationByCode } from "../services/station.service";

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
