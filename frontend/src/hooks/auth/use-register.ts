"use client";

import { useMutation } from "@tanstack/react-query";

import { registerApi } from "@/api/auth.api";

import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const useRegister = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: registerApi,

    onSuccess: () => {
      router.push("/user/verifyEmail");
      toast.success("Account Created Successfully");
    },

    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message);
    },
  });
};
