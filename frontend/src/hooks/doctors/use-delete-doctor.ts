"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoctorApi } from "@/api/doctors";
import { toast } from "sonner";

export const useDeleteDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDoctorApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["doctors"],
      });

      toast.success("Doctor Deleted");
    },
  });
};
