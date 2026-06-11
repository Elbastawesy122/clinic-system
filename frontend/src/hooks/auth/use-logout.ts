"use client";

import { useMutation } from "@tanstack/react-query";

import { logoutApi } from "@/api/auth.api";

import { toast } from "sonner";

import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  return useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      logout();
      router.push("/");
      toast.success("Logged Out");
    },
  });
};
