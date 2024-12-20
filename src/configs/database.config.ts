import mongoose from "mongoose";
import { config } from "./env.config";

const connectDatabase = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("[SETUP] Database connected successfully");
  } catch (error) {
    console.error("[ERROR] Database connection failed", error);
    process.exit(1);
  }
};

export default connectDatabase;
