import { User } from "@/store/auth-store";

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface VerifyEmailDto {
  email: string;
  otp: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  password: string;
}

export interface AuthResponse {
  message: string;
  accessToken: string;
  user: User;
}