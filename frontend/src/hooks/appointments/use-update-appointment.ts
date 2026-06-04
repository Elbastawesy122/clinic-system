"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAppointmentApi } from "@/api/appointment";
import { toast } from "sonner";
import { UpdateAppointmentDto } from "@/types/appointment.types";

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAppointmentDto }) => updateAppointmentApi(id, data),

    onSuccess: () => {
      toast.success("Appointment Updated");

      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },
  });
};
