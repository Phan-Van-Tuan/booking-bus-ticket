import mongoose from "mongoose";

export interface data {
  payload: payload;
  iat: number;
  exp: number;
}

export interface payload {
  id: mongoose.Types.ObjectId;
  role: string;
}
