"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelAppointmentApi } from "@/api/appointment.api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelAppointmentApi,

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });

      toast.success(res.data.message || "Appointment cancelled");
    },

    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err?.response?.data?.message || "Failed to cancel appointment");
    },
  });
};
