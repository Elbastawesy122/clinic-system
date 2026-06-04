import Joi from "joi";

export const createAppointmentSchema = Joi.object({
  doctor: Joi.string().required().messages({
    "string.empty": "Doctor is required",
    "any.required": "Doctor is required",
  }),

  clinic: Joi.string().required().messages({
    "string.empty": "Clinic is required",
    "any.required": "Clinic is required",
  }),

  appointmentDate: Joi.date().greater("now").required().messages({
    "date.base": "Invalid appointment date",
    "date.greater": "Appointment date must be in the future",
    "any.required": "Appointment date is required",
  }),

  timeSlot: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      "string.pattern.base": "Time slot must be in HH:mm format",
      "any.required": "Time slot is required",
    }),

  notes: Joi.string().trim().max(500).allow("").optional().messages({
    "string.max": "Notes must not exceed 500 characters",
  }),
});

export const updateAppointmentSchema = Joi.object({
  doctor: Joi.string().optional(),

  clinic: Joi.string().optional(),

  appointmentDate: Joi.date().greater("now").optional().messages({
    "date.base": "Invalid appointment date",
    "date.greater": "Appointment date must be in the future",
  }),

  timeSlot: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .optional()
    .messages({
      "string.pattern.base": "Time slot must be in HH:mm format",
    }),

  notes: Joi.string().trim().max(500).allow("").optional(),

  status: Joi.string()
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

export const updateAppointmentStatusSchema = Joi.object({
  status: Joi.string()
    .valid("pending", "confirmed", "completed", "cancelled")
    .required()
    .messages({
      "any.only": "Status must be pending, confirmed, completed, or cancelled",
      "any.required": "Status is required",
    }),
});
