"use client";

import { useMutation } from "@tanstack/react-query";
import { deleteUserApi } from "@/api/user";
import { logoutApi } from "@/api/auth";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";

export const useDeleteUser = () => {
  const logout = useAuthStore((s) => s.logout);

  return useMutation({
    mutationFn: async (id: string) => {
      await deleteUserApi(id);

      await logoutApi();
    },

    onSuccess: () => {
      logout();

      toast.success("Account deleted");

      window.location.href = "/";
    },

    onError: () => {
      toast.error("Delete failed");
    },
  });
};
