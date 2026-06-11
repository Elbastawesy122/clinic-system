"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { blockPatientApi } from "@/api/patient.api";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useBlockPatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blockPatientApi,

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });
      toast.success(res.data.message || "Patient has been blocked successfully.");
    },

    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err?.response?.data?.message || "An error occurred while blocking the patient.");
    },
  });
};
