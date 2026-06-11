"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAppointmentStatusApi } from "@/api/appointment.api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useUpdateAppointmentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => updateAppointmentStatusApi(id, status),

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });

      toast.success(res.data.message || "Status updated");
    },

    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err?.response?.data?.message || "Failed to update status");
    },
  });
};
