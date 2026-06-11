"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { forgotPasswordApi } from "@/api/auth.api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useForgotPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: forgotPasswordApi,

    onSuccess: () => {
      router.push("/user/checkEmail");
      toast.success("Reset link sent to email");
    },

    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message);
    },
  });
};
