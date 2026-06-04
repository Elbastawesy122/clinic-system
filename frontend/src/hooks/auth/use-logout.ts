"use client";

import { useMutation } from "@tanstack/react-query";

import { logoutApi } from "@/api/auth";

import { toast } from "sonner";

import { useAuthStore } from "@/store/auth-store";

export const useLogout = () => {
  const logout =
    useAuthStore((s) => s.logout);

  return useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      logout();

      toast.success("Logged Out");
    },
  });
};