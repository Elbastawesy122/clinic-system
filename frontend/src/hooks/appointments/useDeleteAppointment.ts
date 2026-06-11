"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAppointmentApi } from "@/api/appointment.api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAppointmentApi,

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });

      toast.success(res.data.message || "Appointment deleted");
    },

    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err?.response?.data?.message || "Error deleting appointment");
    },
  });
};
