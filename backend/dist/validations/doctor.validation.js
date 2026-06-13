"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDoctorSchema = exports.createDoctorSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const workingDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
exports.createDoctorSchema = joi_1.default.object({
    name: joi_1.default.string().trim().min(3).max(100).required().messages({
        "string.empty": "Doctor name is required",
        "string.min": "Doctor name must be at least 3 characters",
        "string.max": "Doctor name must not exceed 100 characters",
    }),
    email: joi_1.default.string().trim().lowercase().email().required().messages({
        "string.email": "Please enter a valid email address",
        "string.empty": "Email is required",
    }),
    phone: joi_1.default.string()
        .pattern(/^01[0125][0-9]{8}$/)
        .required()
        .messages({
        "string.pattern.base": "Please enter a valid Egyptian phone number",
        "string.empty": "Phone number is required",
    }),
    clinic: joi_1.default.string().required().messages({
        "string.empty": "Clinic is required",
    }),
    specialization: joi_1.default.string().trim().min(2).max(100).required().messages({
        "string.empty": "Specialization is required",
    }),
    experience: joi_1.default.number().integer().min(0).max(60).required().messages({
        "number.base": "Experience must be a number",
        "number.min": "Experience cannot be negative",
        "number.max": "Experience seems invalid",
    }),
    fees: joi_1.default.number().min(0).max(100000).required().messages({
        "number.base": "Fees must be a number",
        "number.min": "Fees cannot be negative",
    }),
    bio: joi_1.default.string().trim().max(1000).allow(""),
    workingDays: joi_1.default.array()
        .items(joi_1.default.string().valid(...workingDays))
        .min(1)
        .required()
        .messages({
        "array.min": "At least one working day is required",
    }),
    startTime: joi_1.default.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .required()
        .messages({
        "string.pattern.base": "Start time must be in HH:mm format",
    }),
    endTime: joi_1.default.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .required()
        .messages({
        "string.pattern.base": "End time must be in HH:mm format",
    }),
});
exports.updateDoctorSchema = joi_1.default.object({
    name: joi_1.default.string().trim().min(3).max(100).messages({
        "string.base": "Name must be a string",
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name must not exceed 100 characters",
    }),
    email: joi_1.default.string().trim().lowercase().email().messages({
        "string.email": "Please enter a valid email address",
    }),
    phone: joi_1.default.string()
        .pattern(/^01[0125][0-9]{8}$/)
        .messages({
        "string.pattern.base": "Please enter a valid Egyptian phone number",
    }),
    clinic: joi_1.default.string().messages({
        "string.base": "Clinic must be a valid id",
    }),
    specialization: joi_1.default.string().trim().min(2).max(100).messages({
        "string.base": "Specialization must be a string",
        "string.min": "Specialization must be at least 2 characters",
        "string.max": "Specialization must not exceed 100 characters",
    }),
    experience: joi_1.default.number().integer().min(0).max(60).messages({
        "number.base": "Experience must be a number",
        "number.min": "Experience cannot be negative",
        "number.max": "Experience seems invalid",
    }),
    fees: joi_1.default.number().min(0).max(100000).messages({
        "number.base": "Fees must be a number",
        "number.min": "Fees cannot be negative",
        "number.max": "Fees is too high",
    }),
    bio: joi_1.default.string().trim().max(1000).allow("").messages({
        "string.max": "Bio must not exceed 1000 characters",
    }),
    workingDays: joi_1.default.array()
        .items(joi_1.default.string().valid(...workingDays))
        .messages({
        "array.base": "Working days must be an array",
        "any.only": "Invalid working day provided",
    }),
    startTime: joi_1.default.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .messages({
        "string.pattern.base": "Start time must be in HH:mm format",
    }),
    endTime: joi_1.default.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .messages({
        "string.pattern.base": "End time must be in HH:mm format",
    }),
    isAvailable: joi_1.default.boolean().messages({
        "boolean.base": "isAvailable must be true or false",
    }),
})
    .min(1)
    .messages({
    "object.min": "At least one field is required to update",
});
