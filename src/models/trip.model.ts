import { string } from "joi";
import mongoose, { Document, Schema } from "mongoose";

export interface ITrip extends Document {
  startLocation: string | object | undefined;
  endLocation: string | object | undefined;
  startTime: Date;
  endTime: Date;
  departureTime: Date;
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
    // 0: no-repeat, 1: repeat-dayly, 2: repeat-weekly, 3: repeat-monthly.
    repeat: { type: Number, default: 0 },
    price: { type: Number, required: true },
    type: { type: String },
    availableSeats: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITrip>("Trip", TripSchema);
