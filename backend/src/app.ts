import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import appointmentRoutes from "./routes/appointment.routes";
import doctorRoutes from "./routes/doctor.routes";
import clinicRoutes from "./routes/clinic.routes";
import { authLimiter } from "./middlewares/rateLimit.middleware";

dotenv.config();

const app = express();

app.use(helmet());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use("/api/auth", authLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard/appointments", appointmentRoutes);
app.use("/api/dashboard/doctors", doctorRoutes);
app.use("/api/dashboard/clinics", clinicRoutes);

export default app;
