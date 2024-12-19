<<<<<<< HEAD
import mongoose, { Document, Schema } from "mongoose";

export interface ITrip extends Document {
  bus: mongoose.Types.ObjectId;
  startLocation: string | object | undefined;
  endLocation: string | object | undefined;
  departureTime: Date;
  arriveTime: Date;
  price: number;
  availableSeats: number;
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
    customSchedule: number
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
=======
import { string } from "joi";
import mongoose, { Document, Schema } from "mongoose";

export interface ITrip extends Document {
  startLocation: string | object | undefined;
  endLocation: string | object | undefined;
  startTime: Date;
  endTime: Date;
  departureTime: Date;
  arriveTime: Date;
  repeat: number;
  price: number;
  type: string;
  availableSeats: number;
}

const TripSchema: Schema = new Schema(
  {
    startLocation: { type: String, required: true },
    endLocation: { type: String, required: true },
    startTime: { type: Date },
    endTime: { type: Date },
    departureTime: { type: Date, require: true },
    arriveTime: { type: Date, require: true },
    // 0: no-repeat, 1: repeat-dayly, 2: repeat-weekly, 3: repeat-monthly.
    repeat: { type: Number, default: 0 },
    price: { type: Number, required: true },
    type: { type: String },
>>>>>>> 37da2e9888ed0f5bff3895bfee6b5463319527c2
    availableSeats: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITrip>("Trip", TripSchema);
