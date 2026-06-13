"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const rateLimit_middleware_1 = require("../middlewares/rateLimit.middleware");
const protect_1 = require("../middlewares/protect");
const auth_validation_1 = require("../validations/auth.validation");
const router = (0, express_1.Router)();
/* =========================
   AUTH (PUBLIC)
========================= */
router.post("/register", rateLimit_middleware_1.authLimiter, (0, validate_middleware_1.validate)(auth_validation_1.registerSchema), auth_controller_1.register);
router.post("/login", rateLimit_middleware_1.authLimiter, (0, validate_middleware_1.validate)(auth_validation_1.loginSchema), auth_controller_1.login);
router.post("/verify-email", (0, validate_middleware_1.validate)(auth_validation_1.verifyEmailSchema), auth_controller_1.verifyEmail);
/* =========================
   TOKEN MANAGEMENT
========================= */
router.post("/refresh-token", auth_controller_1.refreshToken);
router.post("/logout", auth_controller_1.logout);
/* =========================
   PASSWORD RECOVERY
========================= */
router.post("/forgot-password", (0, validate_middleware_1.validate)(auth_validation_1.forgotPasswordSchema), auth_controller_1.forgotPassword);
router.post("/reset-password/:token", (0, validate_middleware_1.validate)(auth_validation_1.resetPasswordSchema), auth_controller_1.resetPassword);
/* =========================
   USER PROFILE (PROTECTED)
========================= */
router
    .route("/me")
    .get(protect_1.protect, auth_controller_1.getMe)
    .put(protect_1.protect, (0, validate_middleware_1.validate)(auth_validation_1.updateMeSchema), auth_controller_1.updateMe);
exports.default = router;
