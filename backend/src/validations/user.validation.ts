import Joi from "joi";

export const updateUserSchema = Joi.object({
  name: Joi.string().trim().min(3).max(50).messages({
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must not exceed 50 characters",
  }),

  email: Joi.string().trim().lowercase().email().messages({
    "string.email": "Please enter a valid email address",
  }),

  phone: Joi.string()
    .pattern(/^01[0125][0-9]{8}$/)
    .messages({
      "string.pattern.base": "Please enter a valid Egyptian phone number",
    }),

  image: Joi.string().uri().messages({
    "string.uri": "Image must be a valid URL",
  }),

  role: Joi.string().valid("admin", "doctor", "patient").messages({
    "any.only": "Role must be admin, doctor, or patient",
  }),

  isBlocked: Joi.boolean(),
})
  .min(1)
  .messages({
    "object.min": "At least one field is required to update",
  });
