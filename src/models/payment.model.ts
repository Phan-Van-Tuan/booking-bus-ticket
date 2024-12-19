import mongoose, { Document, Schema } from "mongoose";

export interface IPayment extends Document {
  orderId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  amount: number;
  method: "cod" | "vnpay" | "credit_card" | "paypal" | "bank_transfer";
  status: "pending" | "completed" | "failed";
  info: Record<string, string>;
  createdAt?: Date;
}

const paymentSchema: Schema = new mongoose.Schema<IPayment>(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    method: {
      type: String,
      enum: ["cod", "vnpay", "credit_card", "paypal", "bank_transfer"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    info: {
      type: Map,
      of: String,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model<IPayment>("Payment", paymentSchema);
export default Payment;
