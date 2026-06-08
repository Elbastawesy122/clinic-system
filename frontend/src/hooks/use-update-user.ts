"use client";

import { useMutation } from "@tanstack/react-query";
import { updateUserApi } from "@/api/user";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useUpdateUser = () => {
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => updateUserApi(id, data),

    onSuccess: (res) => {
      setUser(res.data.user);

      toast.success("Profile updated");
    },

    onError: (
      err: AxiosError<{
        message: string;
      }>,
    ) => {
      toast.error(err.response?.data?.message);
    },
  });
};
