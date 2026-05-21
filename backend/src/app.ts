import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import cookieParser from "cookie-parser";

import helmet from "helmet";

import mongoSanitize from "express-mongo-sanitize";

import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(helmet());

// app.use(mongoSanitize());

app.use("/api/auth", authRoutes);

export default app;
