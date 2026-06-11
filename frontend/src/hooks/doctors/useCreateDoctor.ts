"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDoctorApi } from "@/api/doctors.api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useCreateDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDoctorApi,

    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      toast.success(res.data.message || "Doctor created");
    },

    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err?.response?.data?.message || "Error creating doctor");
    },
  });
};
