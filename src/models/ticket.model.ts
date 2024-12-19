import mongoose, { Document, Schema } from "mongoose";

export interface ITicket extends Document {
<<<<<<< HEAD
  trip: Schema.Types.ObjectId; // ID của chuyến đi
  user: Schema.Types.ObjectId; // ID người đặt vé
  seatNumber: string; // Số ghế được đặt
  price: number; // Giá vé tại thời điểm đặt
  paymentStatus: "pending" | "paid" | "canceled"; // Trạng thái thanh toán
  issuedAt: Date; // Thời gian đặt vé
  status: "booked" | "active" | "used" | "canceled"; // Trạng thái vé
=======
  user: mongoose.Types.ObjectId;
  trip: mongoose.Types.ObjectId;
  seatNumber: number;
  status: "booked" | "cancelled";
>>>>>>> 37da2e9888ed0f5bff3895bfee6b5463319527c2
}

const TicketSchema: Schema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    trip: { type: mongoose.Types.ObjectId, ref: "Trip", required: true },
    seatNumber: { type: Number, required: true },
<<<<<<< HEAD
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
=======
    status: { type: String, default: "booked" },
  },
  { timestamps: true }
>>>>>>> 37da2e9888ed0f5bff3895bfee6b5463319527c2
);

export default mongoose.model<ITicket>("Ticket", TicketSchema);
