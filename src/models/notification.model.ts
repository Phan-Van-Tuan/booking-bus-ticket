import mongoose, { Schema, model, Document } from "mongoose";

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId | null; // ID người nhận (nếu thông báo cá nhân)
  tripId: mongoose.Types.ObjectId | null; // ID chuyến đi liên quan (nếu có)
  title: string; // Tiêu đề thông báo
  message: string; // Nội dung chi tiết
  type: "system" | "trip" | "payment"; // Loại thông báo: hệ thống, chuyến đi, thanh toán
  isRead: boolean; // Trạng thái đã đọc thông báo
  createdAt: Date; // Thời gian tạo
  updatedAt: Date; // Thời gian cập nhật
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", default: null }, // Thông báo cá nhân
    tripId: { type: mongoose.Types.ObjectId, ref: "Trip", default: null }, // Liên quan đến chuyến đi
    title: { type: String, required: true }, // Tiêu đề thông báo
    message: { type: String, required: true }, // Nội dung thông báo
    type: {
      type: String,
      enum: ["system", "trip", "payment"],
      required: true,
    }, // Loại thông báo
    isRead: { type: Boolean, default: false }, // Đánh dấu đã đọc
  },
  {
    timestamps: true, // Tự động tạo createdAt và updatedAt
  }
);

const Notification = model<INotification>("Notification", NotificationSchema);
export default Notification;
