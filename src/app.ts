import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import errorMiddleware from "./middlewares/error.middleware";
import requestLogger from "./middlewares/logger.middleware";
import connectDatabase from "./config/database";
import authRoute from "./routes/auth.route";
import ticketRoute from "./routes/ticket.route";
import tripRoute from "./routes/trip.route";
import userRoute from "./routes/user.route";
import stationRoute from "./routes/station.route";

const app: Application = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use("/api/auth", authRoute);
app.use("/api/tickets", ticketRoute);
app.use("/api/trips", tripRoute);
app.use("/api/users", userRoute);
app.use("/api/station", stationRoute);

// Error Handler
app.use(errorMiddleware);

// Connect to DB
connectDatabase();

export default app;
