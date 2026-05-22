"use client";

import { useMutation } from "@tanstack/react-query";
import { resetPasswordApi } from "@/api/auth";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ResetPasswordDto } from "@/types/auth.types";

export const useResetPassword =
  (token: string) => {
    return useMutation({
      mutationFn: (data: ResetPasswordDto) =>
        resetPasswordApi(token, data),

      onSuccess: () => {
        toast.success(
          "Password Reset Successfully"
        );
      },

      onError: (err: AxiosError<{ message: string }>) => {
        toast.error(
          err.response?.data?.message
        );
      },
    });
  };