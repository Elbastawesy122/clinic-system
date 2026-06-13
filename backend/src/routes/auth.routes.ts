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
import { protect } from "../middlewares/protect";

import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  updateMeSchema,
  verifyEmailSchema,
} from "../validations/auth.validation";

const router = Router();

/* =========================
   AUTH (PUBLIC)
========================= */
router.post("/register", authLimiter, validate(registerSchema), register);

router.post("/login", authLimiter, validate(loginSchema), login);

router.post("/verify-email", validate(verifyEmailSchema), verifyEmail);

/* =========================
   TOKEN MANAGEMENT
========================= */
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

/* =========================
   PASSWORD RECOVERY
========================= */
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);

router.post(
  "/reset-password/:token",
  validate(resetPasswordSchema),
  resetPassword,
);

/* =========================
   USER PROFILE (PROTECTED)
========================= */
router
  .route("/me")
  .get(protect, getMe)
  .put(protect, validate(updateMeSchema), updateMe);

export default router;
