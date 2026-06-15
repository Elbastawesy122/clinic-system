import { z } from "zod";

const egyptianPhoneRegex = /^(\+20|0)?1[0125][0-9]{8}$/;

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters").max(50, "Name is too long"),
    email: z.string().trim().email("Invalid email format"),
    phone: z.string().trim().regex(egyptianPhoneRegex, "Invalid Egyptian phone number").optional().or(z.literal("")),
    password: z.string().min(6, "Password must be at least 6 characters").max(100, "Password is too long"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
    role: z.enum(["admin", "patient"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const loginSchema = z.object({
  email: z.string().trim().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const emailSchema = z.object({
  email: z.string().trim().email("Invalid email format"),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters").max(100, "Password is too long"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const verifyEmailSchema = z.object({
  email: z.string().trim().email("Invalid email format"),
  otp: z.string().trim().min(4, "OTP is too short").max(8, "OTP is too long"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type EmailSchema = z.infer<typeof emailSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>;
