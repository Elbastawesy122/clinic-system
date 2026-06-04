"use client";

import { useMutation } from "@tanstack/react-query";

import { verifyEmailApi } from "@/api/auth";

import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const useVerifyEmail = () => {
    const router = useRouter();
  return useMutation({
    mutationFn: verifyEmailApi,

    onSuccess: () => {
      router.push("/user/login");
      toast.success("Email Verified Successfully");
    },

    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message);
    },
  });
};
