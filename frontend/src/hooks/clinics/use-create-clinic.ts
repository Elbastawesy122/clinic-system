"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { createClinicApi } from "@/api/clinic.api";
import { AxiosError } from "axios";

export const useCreateClinic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createClinicApi,

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["clinics"],
      });

      toast.success(res.data.message || "Clinic created successfully");
    },

    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};
