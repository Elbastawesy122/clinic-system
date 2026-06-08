"use client";

import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/api/auth";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const useLogin = () => {
 
  const router = useRouter();
  const setToken =
    useAuthStore((s) => s.setAccessToken);

  const setUser =
    useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: loginApi,

    onSuccess: (res) => {
      setToken(res.data.accessToken);

      setUser(res.data.user);
      router.push("/dashboard");
      toast.success("Login Success");
    },

    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(
        err.response?.data?.message ||
          "Something went wrong"
      );
      console.log(err.response?.data?.message);
      
    },
  });
};