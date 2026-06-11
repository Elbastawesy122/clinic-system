"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { unblockPatientApi } from "@/api/patient.api";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useUnblockPatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unblockPatientApi,

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });

      toast.success(res.data.message || "Patient has been unblocked successfully.");
    },

    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err?.response?.data?.message || "An error occurred while unblocking the patient.");
    },
  });
};
