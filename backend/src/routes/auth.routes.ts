import { Router } from "express";

import {
  register,
  verifyEmail,
  login,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller";

import { validate } from "../middlewares/validate.middleware";

import { authLimiter } from "../middlewares/rateLimit.middleware";
import { forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema, verifyEmailSchema } from "../validations/auth.validation";

const router = Router();

router.post("/register", authLimiter, validate(registerSchema), register);

router.post("/verify-email", validate(verifyEmailSchema), verifyEmail);

router.post("/login", authLimiter, validate(loginSchema), login);

router.post("/refresh-token", refreshToken);

router.post("/logout", logout);

router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  forgotPassword,
);

router.post(
  "/reset-password/:token",
  validate(resetPasswordSchema),
  resetPassword,
);

export default router;
