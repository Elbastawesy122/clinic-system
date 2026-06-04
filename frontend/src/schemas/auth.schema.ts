import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(50, "Name is too long"),
  email: z.string().trim().email("Invalid email format"),
  phone: z
    .string()
    .trim()
    .regex(/^(\+20|0)?1[0125][0-9]{8}$/, "Invalid Egyptian phone number")
    .or(z.literal(""))
    .optional(),
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const emailSchema = z.object({
  email: z.string().trim().email("Invalid email format"),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters").max(100),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const verifyEmailSchema = z.object({
  email: z.string().trim().email("Invalid email format"),
  otp: z.string().trim().min(4, "OTP is too short").max(8, "OTP is too long"),
});
