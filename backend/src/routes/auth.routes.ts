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

import {
  registerValidation,
  loginValidation,
  otpValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} from "../validations/auth.validation";

import { authLimiter } from "../middlewares/rateLimit.middleware";

const router = Router();

router.post("/register", authLimiter, validate(registerValidation), register);

router.post("/verify-email", validate(otpValidation), verifyEmail);

router.post("/login", authLimiter, validate(loginValidation), login);

router.post("/refresh-token", refreshToken);

router.post("/logout", logout);

router.post(
  "/forgot-password",
  validate(forgotPasswordValidation),
  forgotPassword,
);

router.post(
  "/reset-password/:token",
  validate(resetPasswordValidation),
  resetPassword,
);

export default router;
