import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().trim().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must not exceed 50 characters",
  }),

  email: Joi.string().trim().lowercase().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
  }),

  password: Joi.string().min(6).max(100).required().messages({
    "string.min": "Password must be at least 6 characters",
    "string.empty": "Password is required",
  }),

  phone: Joi.string()
    .pattern(/^\+[1-9]\d{1,14}$/)
    .optional()
    .messages({
      "string.pattern.base":
        "Phone number must be in international format (e.g. +201012345678)",
    }),

  role: Joi.string()
    .valid("admin", "patient")
    .default("patient")
    .optional()
    .messages({
      "any.only": "Invalid role",
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),

  password: Joi.string().required(),
});

export const verifyEmailSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),

  otp: Joi.string()
    .length(6)
    .pattern(/^[0-9]{6}$/)
    .required()
    .messages({
      "string.length": "OTP must be 6 digits",
      "string.pattern.base": "OTP must contain only numbers",
    }),
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().min(6).max(100).required().messages({
    "string.min": "Password must be at least 6 characters",
  }),
});

export const updateMeSchema = Joi.object({
  name: Joi.string().trim().min(3).max(50).messages({
    "string.base": "Name must be a string",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must not exceed 50 characters",
  }),

  phone: Joi.string()
    .trim()
    .pattern(/^01[0125][0-9]{8}$/)
    .messages({
      "string.pattern.base": "Invalid Egyptian phone number",
    }),

  image: Joi.string().trim().uri().messages({
    "string.uri": "Image must be a valid URL",
  }),

  /* =========================
     FORBIDDEN FIELDS (SECURITY)
  ========================= */

  email: Joi.forbidden().messages({
    "any.unknown": "Email cannot be updated",
  }),

  password: Joi.forbidden().messages({
    "any.unknown": "Password cannot be updated here",
  }),

  role: Joi.forbidden().messages({
    "any.unknown": "Role cannot be updated",
  }),

  isVerified: Joi.forbidden().messages({
    "any.unknown": "Verification status cannot be changed",
  }),

  isBlocked: Joi.forbidden().messages({
    "any.unknown": "Blocked status cannot be changed",
  }),

  refreshToken: Joi.forbidden(),
  verificationOTP: Joi.forbidden(),
  verificationOTPExpire: Joi.forbidden(),
  resetPasswordToken: Joi.forbidden(),
  resetPasswordExpire: Joi.forbidden(),
})
  .min(1)
  .messages({
    "object.min": "At least one field is required to update profile",
  })
  .options({
    abortEarly: false,
    stripUnknown: true,
  });
