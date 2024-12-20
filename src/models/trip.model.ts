import mongoose, { Document, Schema } from "mongoose";

export interface ITrip extends Document {
  bus: mongoose.Types.ObjectId;
  startLocation: string | object | undefined;
  endLocation: string | object | undefined;
  departureTime: Date;
  arriveTime: Date;
  price: number;
  availableSeats: number;
  booked: number[];
  reserved: number[];
}

export interface CreateTripParams {
  bus: string;
  startLocation: string | object;
  endLocation: string | object;
  price: number;
  schedule: {
    startDate: Date;
    endDate?: Date;
    type: "just_one" | "daily" | "weekly" | "monthly" | "custom";
    customSchedule: number;
    time: { departure: string; drive: number };
  };
}

const TripSchema: Schema = new Schema(
  {
    bus: { type: mongoose.Types.ObjectId, required: true },
    startLocation: { type: String, required: true },
    endLocation: { type: String, required: true },
    departureTime: { type: Date, require: true },
    arriveTime: { type: Date, require: true },
    price: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    booked: { type: Array },
    reserved: { type: Array },
  },
  { timestamps: true }
);

export default mongoose.model<ITrip>("Trip", TripSchema);
