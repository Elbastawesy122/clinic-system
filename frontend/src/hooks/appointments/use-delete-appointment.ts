"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAppointmentApi } from "@/api/appointment";
import { toast } from "sonner";

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAppointmentApi,

    onSuccess: () => {
      toast.success("Appointment Deleted");

      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },
  });
};
