"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAppointmentApi } from "@/api/appointment.api";
import { toast } from "sonner";
import { AppointmentDto } from "@/types/appointment.types";
import { AxiosError } from "axios";

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AppointmentDto }) => updateAppointmentApi(id, data),

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });

      toast.success(res.data.message || "Appointment updated");
    },

    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err?.response?.data?.message || "Failed to update appointment");
    },
  });
};
