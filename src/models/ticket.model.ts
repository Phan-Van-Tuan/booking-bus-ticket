import mongoose, { Document, Schema } from "mongoose";

export interface ITicket extends Document {
  trip: Schema.Types.ObjectId; // ID của chuyến đi
  user: Schema.Types.ObjectId; // ID người đặt vé
  seatId: number; // Số ghế được đặt
  price: number; // Giá vé tại thời điểm đặt
  paymentStatus: "pending" | "paid" | "canceled"; // Trạng thái thanh toán
  issuedAt: Date; // Thời gian đặt vé
  status: "booked" | "active" | "used" | "canceled"; // Trạng thái vé
}

const TicketSchema: Schema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    trip: { type: mongoose.Types.ObjectId, ref: "Trip", required: true },
    seatId: { type: Number, required: true },
    price: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "canceled"],
      default: "pending",
    },
    issuedAt: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["booked", "active", "used", "canceled"],
      default: "booked",
    },
  },
  {
    timestamps: true, // Tự động tạo createdAt và updatedAt
  }
);

export default mongoose.model<ITicket>("Ticket", TicketSchema);
