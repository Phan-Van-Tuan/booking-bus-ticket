import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import errorMiddleware from "./middlewares/error.middleware";
import requestLogger from "./middlewares/logger.middleware";
import connectDatabase from "./config/database";
<<<<<<< HEAD
import authRoute from "./routes/notification.route";
import ticketRoute from "./routes/booking.route";
import tripRoute from "./routes/trip.route";
import userRoute from "./routes/user.route";
import siteRoute from "./routes/site.route";
=======
import authRoute from "./routes/auth.route";
import ticketRoute from "./routes/ticket.route";
import tripRoute from "./routes/trip.route";
import userRoute from "./routes/user.route";
import stationRoute from "./routes/station.route";
>>>>>>> 37da2e9888ed0f5bff3895bfee6b5463319527c2

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
<<<<<<< HEAD
app.use("/api/", siteRoute);
=======
app.use("/api/station", stationRoute);
>>>>>>> 37da2e9888ed0f5bff3895bfee6b5463319527c2

// Error Handler
app.use(errorMiddleware);

// Connect to DB
connectDatabase();

export default app;
