"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createDoctorApi } from "@/api/doctors";

import { toast } from "sonner";

export const useCreateDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDoctorApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["doctors"],
      });

      toast.success("Doctor Created");
    },
  });
};
