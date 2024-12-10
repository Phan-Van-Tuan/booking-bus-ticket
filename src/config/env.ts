import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT || 4500,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/system_bus",
  SALT: process.env.SALT || 10,
  JWT_SECRET: process.env.JWT_SECRET || "secret",
};
