import { api } from "@/lib/api";

import { AuthResponse, ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto, VerifyEmailDto } from "@/types/auth.types";

export const registerApi = (data: RegisterDto) => api.post("/auth/register", data);

export const loginApi = (data: LoginDto) =>
  api.post("/auth/login", data, {
    withCredentials: true,
  });

export const refreshTokenApi = () => api.post("/auth/refresh-token");

export const verifyEmailApi = (data: VerifyEmailDto) => api.post("/auth/verify-email", data);

export const forgotPasswordApi = (data: ForgotPasswordDto) => api.post("/auth/forgot-password", data);

export const resetPasswordApi = (token: string, data: ResetPasswordDto) => api.post(`/auth/reset-password/${token}`, data);

export const logoutApi = () => api.post("/auth/logout");

export const meApi = async (): Promise<AuthResponse> => {
  const response = await api.get<AuthResponse>("/auth/me");
  return response.data;
};
