"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { forgotPasswordApi } from "@/api/auth";
import { toast } from "sonner";

export const useForgotPassword =
  () => {
    return useMutation({
      mutationFn: forgotPasswordApi,

      onSuccess: () => {
        toast.success(
          "Reset link sent to email"
        );
      },

      onError: (err: AxiosError<{ message: string }>) => {
        toast.error(
          err.response?.data?.message
        );
      },
    });
  };