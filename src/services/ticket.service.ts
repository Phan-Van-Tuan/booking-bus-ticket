import mongoose from "mongoose";
import Ticket, { ITicket } from "../models/ticket.model";
import Trip from "../models/trip.model";

// Đặt vé
export const bookNewTicket = async (
  userId: mongoose.Types.ObjectId,
  ticketData: { tripId: mongoose.Types.ObjectId; seatNumber: number }
): Promise<ITicket> => {
  const trip = await Trip.findById(ticketData.tripId);
  if (!trip) throw new Error("Trip not found");

  // Kiểm tra số ghế hợp lệ
  if (
    ticketData.seatNumber > trip.availableSeats ||
    ticketData.seatNumber <= 0
  ) {
    throw new Error("Invalid seat number");
  }

  // Đảm bảo ghế chưa được đặt
  const existingTicket = await Ticket.findOne({
    trip: ticketData.tripId,
    seatNumber: ticketData.seatNumber,
  });
  if (existingTicket) throw new Error("Seat already booked");

  // Đặt vé
  const ticket = await Ticket.create({
    user: userId,
    trip: ticketData.tripId,
    seatNumber: ticketData.seatNumber,
  });

  // Giảm số ghế còn trống của chuyến xe
  trip.availableSeats -= 1;
  await trip.save();

  return ticket;
};

// Lấy danh sách vé của người dùng
export const getTicketsByUserId = async (
  userId: string
): Promise<ITicket[]> => {
  return Ticket.find({ user: userId }).populate("trip");
};

// Hủy vé
export const cancelTicketById = async (
  ticketId: string,
  userId: string
): Promise<boolean> => {
  const ticket = await Ticket.findOne({ _id: ticketId, user: userId });
  if (!ticket) throw new Error("Ticket not found");

  const trip = await Trip.findById(ticket.trip);
  if (trip) {
    // Tăng số ghế còn trống
    trip.availableSeats += 1;
    await trip.save();
  }

  await ticket.deleteOne();
  return true;
};
