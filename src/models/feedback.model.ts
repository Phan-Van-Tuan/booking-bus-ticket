import mongoose, { model, Schema } from "mongoose";

export interface IFeedback extends Document {
  trip: mongoose.Types.ObjectId;
  bus: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
}

const FeedbackSchema = new Schema<IFeedback>(
  {
    trip: { type: Schema.Types.ObjectId, ref: "Trip", required: true },
    bus: { type: Schema.Types.ObjectId, ref: "Bus", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Feedback = model<IFeedback>("Feedback", FeedbackSchema);
export default Feedback;
