import { api } from "@/lib/api";
import { ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto, VerifyEmailDto } from "@/types/auth.types";

// REGISTER
export const registerApi = (data: RegisterDto) =>
  api.post("/auth/register", data);

// LOGIN
export const loginApi = (data: LoginDto) =>
  api.post("/auth/login", data);

// VERIFY EMAIL
export const verifyEmailApi = (data: VerifyEmailDto) =>
  api.post("/auth/verify-email", data);

// FORGOT PASSWORD
export const forgotPasswordApi = (data: ForgotPasswordDto) =>
  api.post("/auth/forgot-password", data);

// RESET PASSWORD
export const resetPasswordApi = (token: string, data: ResetPasswordDto) =>
  api.post(`/auth/reset-password/${token}`, data);