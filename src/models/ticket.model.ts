import mongoose, { Document, Schema } from "mongoose";

export interface ITicket extends Document {
  user: mongoose.Types.ObjectId;
  trip: mongoose.Types.ObjectId;
  seatNumber: number;
  status: "booked" | "cancelled";
}

const TicketSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    trip: { type: Schema.Types.ObjectId, ref: "Trip", required: true },
    seatNumber: { type: Number, required: true },
    status: { type: String, default: "booked" },
  },
  { timestamps: true }
);

export default mongoose.model<ITicket>("Ticket", TicketSchema);
