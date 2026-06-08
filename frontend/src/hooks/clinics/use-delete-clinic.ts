"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { deleteClinicApi } from "@/api/clinic";
import { AxiosError } from "axios";

export const useDeleteClinic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteClinicApi,

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["clinics"],
      });

      toast.success(res.data.message || "Clinic deleted successfully");
    },

    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};
