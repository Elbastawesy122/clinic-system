"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAppointmentStatusSchema = exports.updateAppointmentSchema = exports.createAppointmentSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createAppointmentSchema = joi_1.default.object({
    doctor: joi_1.default.string().required().messages({
        "string.empty": "Doctor is required",
        "any.required": "Doctor is required",
    }),
    clinic: joi_1.default.string().required().messages({
        "string.empty": "Clinic is required",
        "any.required": "Clinic is required",
    }),
    appointmentDate: joi_1.default.date().greater("now").required().messages({
        "date.base": "Invalid appointment date",
        "date.greater": "Appointment date must be in the future",
        "any.required": "Appointment date is required",
    }),
    timeSlot: joi_1.default.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .required()
        .messages({
        "string.pattern.base": "Time slot must be in HH:mm format",
        "any.required": "Time slot is required",
    }),
    notes: joi_1.default.string().trim().max(500).allow("").optional().messages({
        "string.max": "Notes must not exceed 500 characters",
    }),
});
exports.updateAppointmentSchema = joi_1.default.object({
    doctor: joi_1.default.string().optional(),
    clinic: joi_1.default.string().optional(),
    appointmentDate: joi_1.default.date().greater("now").optional().messages({
        "date.base": "Invalid appointment date",
        "date.greater": "Appointment date must be in the future",
    }),
    timeSlot: joi_1.default.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .optional()
        .messages({
        "string.pattern.base": "Time slot must be in HH:mm format",
    }),
    notes: joi_1.default.string().trim().max(500).allow("").optional(),
    status: joi_1.default.string()
        .valid("pending", "confirmed", "completed", "cancelled")
        .optional()
        .messages({
        "any.only": "Status must be pending, confirmed, completed, or cancelled",
    }),
})
    .min(1)
    .messages({
    "object.min": "At least one field is required to update appointment",
});
exports.updateAppointmentStatusSchema = joi_1.default.object({
    status: joi_1.default.string()
        .valid("pending", "confirmed", "completed", "cancelled")
        .required()
        .messages({
        "any.only": "Status must be pending, confirmed, completed, or cancelled",
        "any.required": "Status is required",
    }),
});
