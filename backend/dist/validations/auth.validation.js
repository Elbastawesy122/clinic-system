"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMeSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.verifyEmailSchema = exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerSchema = joi_1.default.object({
    name: joi_1.default.string().trim().min(3).max(50).required().messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name must not exceed 50 characters",
    }),
    email: joi_1.default.string().trim().lowercase().email().required().messages({
        "string.email": "Invalid email format",
        "string.empty": "Email is required",
    }),
    password: joi_1.default.string().min(6).max(100).required().messages({
        "string.min": "Password must be at least 6 characters",
        "string.empty": "Password is required",
    }),
    phone: joi_1.default.string()
        .pattern(/^\+[1-9]\d{1,14}$/)
        .optional()
        .messages({
        "string.pattern.base": "Phone number must be in international format (e.g. +201012345678)",
    }),
    role: joi_1.default.string()
        .valid("admin", "patient")
        .default("patient")
        .optional()
        .messages({
        "any.only": "Invalid role",
    }),
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().trim().lowercase().email().required(),
    password: joi_1.default.string().required(),
});
exports.verifyEmailSchema = joi_1.default.object({
    email: joi_1.default.string().trim().lowercase().email().required(),
    otp: joi_1.default.string()
        .length(6)
        .pattern(/^[0-9]{6}$/)
        .required()
        .messages({
        "string.length": "OTP must be 6 digits",
        "string.pattern.base": "OTP must contain only numbers",
    }),
});
exports.forgotPasswordSchema = joi_1.default.object({
    email: joi_1.default.string().trim().lowercase().email().required(),
});
exports.resetPasswordSchema = joi_1.default.object({
    password: joi_1.default.string().min(6).max(100).required().messages({
        "string.min": "Password must be at least 6 characters",
    }),
});
exports.updateMeSchema = joi_1.default.object({
    name: joi_1.default.string().trim().min(3).max(50).messages({
        "string.base": "Name must be a string",
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name must not exceed 50 characters",
    }),
    phone: joi_1.default.string()
        .trim()
        .pattern(/^01[0125][0-9]{8}$/)
        .messages({
        "string.pattern.base": "Invalid Egyptian phone number",
    }),
    image: joi_1.default.string().trim().uri().messages({
        "string.uri": "Image must be a valid URL",
    }),
    /* =========================
       FORBIDDEN FIELDS (SECURITY)
    ========================= */
    email: joi_1.default.forbidden().messages({
        "any.unknown": "Email cannot be updated",
    }),
    password: joi_1.default.forbidden().messages({
        "any.unknown": "Password cannot be updated here",
    }),
    role: joi_1.default.forbidden().messages({
        "any.unknown": "Role cannot be updated",
    }),
    isVerified: joi_1.default.forbidden().messages({
        "any.unknown": "Verification status cannot be changed",
    }),
    isBlocked: joi_1.default.forbidden().messages({
        "any.unknown": "Blocked status cannot be changed",
    }),
    refreshToken: joi_1.default.forbidden(),
    verificationOTP: joi_1.default.forbidden(),
    verificationOTPExpire: joi_1.default.forbidden(),
    resetPasswordToken: joi_1.default.forbidden(),
    resetPasswordExpire: joi_1.default.forbidden(),
})
    .min(1)
    .messages({
    "object.min": "At least one field is required to update profile",
})
    .options({
    abortEarly: false,
    stripUnknown: true,
});
