"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { deletePatientApi } from "@/api/patient.api";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useDeletePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePatientApi,

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });
      toast.success(res.data.message || "Patient deleted");
    },

    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err?.response?.data?.message || "Error deleting patient");
    },
  });
};
