"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.updateUserSchema = joi_1.default.object({
    name: joi_1.default.string().trim().min(3).max(50).messages({
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name must not exceed 50 characters",
    }),
    email: joi_1.default.string().trim().lowercase().email().messages({
        "string.email": "Please enter a valid email address",
    }),
    phone: joi_1.default.string()
        .pattern(/^01[0125][0-9]{8}$/)
        .messages({
        "string.pattern.base": "Please enter a valid Egyptian phone number",
    }),
    image: joi_1.default.string().uri().messages({
        "string.uri": "Image must be a valid URL",
    }),
    role: joi_1.default.string().valid("admin", "doctor", "patient").messages({
        "any.only": "Role must be admin, doctor, or patient",
    }),
    isBlocked: joi_1.default.boolean(),
})
    .min(1)
    .messages({
    "object.min": "At least one field is required to update",
});
