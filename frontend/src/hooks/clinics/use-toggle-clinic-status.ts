"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { toggleClinicStatusApi } from "@/api/clinic.api";
import { AxiosError } from "axios";

export const useToggleClinicStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleClinicStatusApi,

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["clinics"],
      });

      toast.success(res.data.message || "Clinic status updated");
    },

    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};
