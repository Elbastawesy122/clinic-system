import { Router } from "express";

import {
  register,
  verifyEmail,
  login,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,
  getMe,
  updateMe,
} from "../controllers/auth.controller";

import { validate } from "../middlewares/validate.middleware";

import { authLimiter } from "../middlewares/rateLimit.middleware";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  updateMeSchema,
  verifyEmailSchema,
} from "../validations/auth.validation";
import { protect } from "../middlewares/protect";

const router = Router();

router.post("/register", authLimiter, validate(registerSchema), register);

router.post("/verify-email", validate(verifyEmailSchema), verifyEmail);

router.post("/login", authLimiter, validate(loginSchema), login);

router.post("/refresh-token", refreshToken);

router.post("/logout", logout);

router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);

router.post(
  "/reset-password/:token",
  validate(resetPasswordSchema),
  resetPassword,
);

router.get("/me", protect, getMe);
router.put("/me", protect, validate(updateMeSchema), updateMe);

export default router;
