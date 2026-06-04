"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointmentApi } from "@/api/appointment";
import { toast } from "sonner";

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAppointmentApi,

    onSuccess: () => {
      toast.success("Appointment Created");

      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },

    onError: (error) => {
      console.log(error);
      toast.error("Failed");
    },
  });
};
