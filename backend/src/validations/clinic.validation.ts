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

export const createClinicSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required().messages({
    "string.empty": "Clinic name is required",
    "string.min": "Clinic name must be at least 3 characters",
    "string.max": "Clinic name must not exceed 100 characters",
  }),

  description: Joi.string().trim().max(1000).allow("").messages({
    "string.max": "Description must not exceed 1000 characters",
  }),

  image: Joi.string().uri().allow("").messages({
    "string.uri": "Image must be a valid URL",
  }),

  location: Joi.string().trim().min(5).max(255).required().messages({
    "string.empty": "Location is required",
  }),

  phone: Joi.string()
    .pattern(/^01[0125][0-9]{8}$/)
    .required()
    .messages({
      "string.pattern.base": "Please enter a valid Egyptian phone number",
      "string.empty": "Phone number is required",
    }),

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

export const updateClinicSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100),

  description: Joi.string().trim().max(1000).allow(""),

  image: Joi.string().uri().allow(""),

  location: Joi.string().trim().min(5).max(255),

  phone: Joi.string().pattern(/^01[0125][0-9]{8}$/),

  workingDays: Joi.array().items(Joi.string().valid(...workingDays)),

  startTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),

  endTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),

  isActive: Joi.boolean(),
})
  .min(1)
  .messages({
    "object.min": "At least one field is required to update",
  });
