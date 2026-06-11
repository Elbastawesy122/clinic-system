"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointmentApi } from "@/api/appointment.api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAppointmentApi,

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });

      toast.success(res.data.message || "Appointment created");
    },

    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err?.response?.data?.message || "Failed to create appointment");
    },
  });
};
