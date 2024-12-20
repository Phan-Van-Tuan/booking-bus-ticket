import mongoose from "mongoose";
import Ticket, { ITicket } from "../models/ticket.model";
import Trip from "../models/trip.model";
import Bull from "bull";
import PaymentService from "./payment.service";

export const bookingQueue = new Bull(
  "seat-booking-queue",
  "redis://127.0.0.1:6379"
);
const cancelBookingQueue = new Bull(
  "cancel-booking-queuequeue",
  "redis://127.0.0.1:6379"
);

bookingQueue.process(async (job) => {
  return handleBooking(job);
});

cancelBookingQueue.process("cancel", async (job) => {
  console.log(`[LOG] ----- đang xử lý ${job}.`);
  const { seatId, userId, tripId } = job.data;
  // Kiểm tra và cập nhật ghế trong MongoDB
  const trip = await Trip.findById(tripId);
  if (!trip) throw new Error("Chuyến xe không tồn tại");
  // Xóa ghế khỏi danh sách reserved
  trip.reserved = trip.reserved.filter((id) => id !== seatId);
  await trip.save();
  return `Ghế ${seatId} của chuyến ${tripId} đã được giải phóng sau 15 phút.`;
});

// Hàm xử lý đặt vé
async function handleBooking(job: { id?: any; data?: any }) {
  try {
    const { seatId, userId, tripId, ip } = job.data;

    // Kiểm tra và cập nhật ghế trong MongoDB
    const trip = await Trip.findById(tripId);
    if (!trip) throw new Error("Chuyến xe không tồn tại");

    if (trip.availableSeats < 1) throw new Error("Cháy ghế!");
    if (trip.booked.includes(seatId)) throw new Error("Ghế đã được hốt!");
    if (trip.reserved.includes(seatId)) throw new Error("Ghế đang được giữ!");
    console.log(`[LOG] ----- Ghế ${seatId} của chuyến ${tripId} đang trống nè`);

    // const session = await mongoose.startSession();
    // session.startTransaction();
    try {
      trip.reserved.push(seatId);
      // Lưu trạng thái vào DB
      // await trip.save({ session });
      await trip.save();
      cancelBookingQueue.add("cancel", job.data, { delay: 900000 });
      console.log(`[LOG] ----- Giữ ghế hold:${tripId}:${seatId}`);
      // gửi về url banking
      const url = await PaymentService.createPayment(
        trip.price,
        ip,
        JSON.stringify(job.data)
      );
      // await session.commitTransaction();
      return url;
    } catch (err) {
      // Rollback nếu có lỗi
      // await session.abortTransaction();
      throw err;
    } finally {
      // session.endSession();
    }
    return ` công việc:${tripId}:${seatId}`;
  } catch (e) {
    throw e;
  }
}

export async function confirmBooking(data: string) {
  const { seatId, userId, tripId } = JSON.parse(data);
  // Kiểm tra và cập nhật ghế trong MongoDB
  const trip = await Trip.findById(tripId);
  if (!trip) throw new Error("Chuyến xe không tồn tại");
  // Xóa ghế khỏi danh sách reserved
  trip.reserved = trip.reserved.filter((id) => id !== seatId);
  trip.booked.push(seatId);
  await trip.save();
  const ticket = await Ticket.create({
    trip: tripId,
    user: userId,
    seatId: seatId,
    price: trip.price,
  });
  await ticket.save();
  return ticket;
}
// Lấy danh sách vé của người dùng
export const getTicketsByUserId = async (
  userId: mongoose.Types.ObjectId
): Promise<ITicket[]> => {
  return Ticket.find({ user: userId }).populate("trip").populate({
    path: "user",
    select: "-password", // Loại trừ trường password
  });
};

// Hủy vé
export const cancelTicketById = async (
  ticketId: string,
  userId: mongoose.Types.ObjectId
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

export const checkSeats = async (ticketData: {
  tripId: mongoose.Types.ObjectId;
  departureTime: Date;
  seatNumber: number;
}) => {
  return await Ticket.countDocuments({
    trip: ticketData.tripId,
    departureTime: ticketData.departureTime,
  });
};
// -------------------- LOG -----------------------

bookingQueue.on("completed", (job, result) => {
  console.log("[LOG] ----- Job đã hoàn thành!", job.data);
});

bookingQueue.on("failed", (job, err) => {
  console.error("[LOG] ----- Job thất bại!", job.data, err);
});

cancelBookingQueue.on("completed", (job, result) => {
  console.log("[LOG] ----- Job cancel đã hoàn thành!", job.data);
});

cancelBookingQueue.on("failed", (job, err) => {
  console.error("[LOG] ----- Job cancel thất bại!", job.data, err);
});
