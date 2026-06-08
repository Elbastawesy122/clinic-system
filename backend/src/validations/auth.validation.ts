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
    .pattern(/^01[0125][0-9]{8}$/)
    .optional()
    .messages({
      "string.pattern.base": "Invalid Egyptian phone number",
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
  name: Joi.string().trim().min(3).max(50),

  phone: Joi.string()
    .trim()
    .pattern(/^01[0125][0-9]{8}$/)
    .messages({
      "string.pattern.base": "Invalid Egyptian phone number",
    }),

  image: Joi.string().trim().uri(),

  email: Joi.forbidden(),
  password: Joi.forbidden(),
  role: Joi.forbidden(),
  isVerified: Joi.forbidden(),
  isBlocked: Joi.forbidden(),
  refreshToken: Joi.forbidden(),
  verificationOTP: Joi.forbidden(),
  verificationOTPExpire: Joi.forbidden(),
  resetPasswordToken: Joi.forbidden(),
  resetPasswordExpire: Joi.forbidden(),
})
  .min(1)
  .options({
    abortEarly: false,
    stripUnknown: true,
  });
