"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateClinicSchema = exports.createClinicSchema = void 0;
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
exports.createClinicSchema = joi_1.default.object({
    name: joi_1.default.string().trim().min(3).max(100).required().messages({
        "string.empty": "Clinic name is required",
        "string.min": "Clinic name must be at least 3 characters",
        "string.max": "Clinic name must not exceed 100 characters",
    }),
    description: joi_1.default.string().trim().max(1000).allow("").messages({
        "string.max": "Description must not exceed 1000 characters",
    }),
    image: joi_1.default.string().uri().allow("").messages({
        "string.uri": "Image must be a valid URL",
    }),
    location: joi_1.default.string().trim().min(5).max(255).required().messages({
        "string.empty": "Location is required",
    }),
    phone: joi_1.default.string()
        .pattern(/^01[0125][0-9]{8}$/)
        .required()
        .messages({
        "string.pattern.base": "Please enter a valid Egyptian phone number",
        "string.empty": "Phone number is required",
    }),
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
exports.updateClinicSchema = joi_1.default.object({
    name: joi_1.default.string().trim().min(3).max(100).messages({
        "string.base": "Name must be a string",
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name must not exceed 100 characters",
    }),
    description: joi_1.default.string().trim().max(1000).allow("").messages({
        "string.max": "Description must not exceed 1000 characters",
    }),
    image: joi_1.default.string().uri().allow("").messages({
        "string.uri": "Image must be a valid URL",
    }),
    location: joi_1.default.string().trim().min(5).max(255).messages({
        "string.base": "Location must be a string",
        "string.min": "Location must be at least 5 characters",
        "string.max": "Location must not exceed 255 characters",
    }),
    phone: joi_1.default.string()
        .pattern(/^01[0125][0-9]{8}$/)
        .messages({
        "string.pattern.base": "Please enter a valid Egyptian phone number",
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
    isActive: joi_1.default.boolean().messages({
        "boolean.base": "isActive must be true or false",
    }),
})
    .min(1)
    .messages({
    "object.min": "At least one field is required to update",
});
