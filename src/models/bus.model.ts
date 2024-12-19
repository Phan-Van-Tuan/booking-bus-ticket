import { Schema, model, Document } from "mongoose";

// 1. Interface định nghĩa cấu trúc dữ liệu cho Bus
export interface IBus extends Document {
  busNumber: string; // Số hiệu xe
  licensePlate: string; // Biển số xe
  driverName: string; // Tên tài xế
  driverPhone: string; // Số điện thoại tài xế
  seatCapacity: number; // Tổng số ghế trên xe
  busType: "sleeper" | "seater" | "luxury"; // Loại xe: giường nằm, ghế ngồi, cao cấp
  status: "active" | "maintenance" | "inactive"; // Trạng thái: hoạt động, bảo dưỡng, không hoạt động
}

const BusSchema = new Schema<IBus>(
  {
    busNumber: { type: String, required: true, unique: true },
    licensePlate: { type: String, required: true, unique: true },
    driverName: { type: String, required: true },
    driverPhone: { type: String, required: true },
    seatCapacity: { type: Number, required: true },
    busType: {
      type: String,
      enum: ["sleeper", "seater", "luxury"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "maintenance", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
const Bus = model<IBus>("Bus", BusSchema);

export default Bus;
