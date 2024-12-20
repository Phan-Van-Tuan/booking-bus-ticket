import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import errorMiddleware from "./middlewares/error.middleware";
import requestLogger from "./middlewares/logger.middleware";
import connectDatabase from "./configs/database.config";
import authRoute from "./routes/notification.route";
import paymenRoute from "./routes/payment.route";
import ticketRoute from "./routes/booking.route";
import tripRoute from "./routes/trip.route";
import userRoute from "./routes/user.route";
import siteRoute from "./routes/site.route";

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
app.use("/api/payment/", paymenRoute);
app.use("/api/", siteRoute);

// Error Handler
app.use(errorMiddleware);

// Connect to DB
connectDatabase();

export default app;
