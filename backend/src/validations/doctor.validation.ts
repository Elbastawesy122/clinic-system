import Joi from "joi";

const workingDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const createDoctorSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required().messages({
    "string.empty": "Doctor name is required",
    "string.min": "Doctor name must be at least 3 characters",
    "string.max": "Doctor name must not exceed 100 characters",
  }),

  email: Joi.string().trim().lowercase().email().required().messages({
    "string.email": "Please enter a valid email address",
    "string.empty": "Email is required",
  }),

  phone: Joi.string()
    .pattern(/^01[0125][0-9]{8}$/)
    .required()
    .messages({
      "string.pattern.base": "Please enter a valid Egyptian phone number",
      "string.empty": "Phone number is required",
    }),

  clinic: Joi.string().required().messages({
    "string.empty": "Clinic is required",
  }),

  specialization: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Specialization is required",
  }),

  experience: Joi.number().integer().min(0).max(60).required().messages({
    "number.base": "Experience must be a number",
    "number.min": "Experience cannot be negative",
    "number.max": "Experience seems invalid",
  }),

  fees: Joi.number().min(0).max(100000).required().messages({
    "number.base": "Fees must be a number",
    "number.min": "Fees cannot be negative",
  }),

  bio: Joi.string().trim().max(1000).allow(""),

  workingDays: Joi.array()
    .items(Joi.string().valid(...workingDays))
    .min(1)
    .required()
    .messages({
      "array.min": "At least one working day is required",
    }),

  startTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      "string.pattern.base": "Start time must be in HH:mm format",
    }),

  endTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      "string.pattern.base": "End time must be in HH:mm format",
    }),
});

export const updateDoctorSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100),

  email: Joi.string().trim().lowercase().email(),

  phone: Joi.string().pattern(/^01[0125][0-9]{8}$/),

  clinic: Joi.string(),

  specialization: Joi.string().trim().min(2).max(100),

  experience: Joi.number().integer().min(0).max(60),

  fees: Joi.number().min(0).max(100000),

  bio: Joi.string().trim().max(1000).allow(""),

  workingDays: Joi.array().items(Joi.string().valid(...workingDays)),

  startTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),

  endTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),

  isAvailable: Joi.boolean(),
})
  .min(1)
  .messages({
    "object.min": "At least one field is required to update",
  });
