import { NextFunction, Request, Response } from "express";
import {
  getTicketsByUserId,
  cancelTicketById,
  bookingQueue,
} from "../services/booking.service";

// Đặt vé
export const bookTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;
    const job = await bookingQueue.add({
      seatId: req.body.seatId,
      userId: userId,
      tripId: req.body.tripId,
      ip: req.ip,
    });
    job
      .finished()
      .then((result: any) => {
        return res.status(201).json({
          message: "success",
          data: result,
        });
      })
      .catch((error) => {
        console.error("[ERROR] ----- Lỗi khi hoàn thành công việc:", error);
      });
    return;
  } catch (error) {
    next(error);
  }
};

// Lấy danh sách vé của người dùng
export const getUserTickets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id; // `req.user` được gắn từ middleware `authenticate`
    const tickets = await getTicketsByUserId(userId);
    res.status(200).json({
      message: "success",
      data: tickets,
    });
  } catch (error) {
    next(error);
  }
};

// Hủy vé
export const cancelTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ticketId = req.params.id;
    const userId = req.user.id; // `req.user` được gắn từ middleware `authenticate`
    const result = await cancelTicketById(ticketId, userId);
    if (!result)
      res.status(404).json({ message: "Ticket not found or already canceled" });
    res.status(200).json({ message: "Ticket canceled successfully" });
  } catch (error) {
    next(error);
  }
};
