"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { updateClinicApi } from "@/api/clinic";

import { ClinicDto } from "@/types/clinic.types";
import { AxiosError } from "axios";

interface UpdateClinicPayload {
  id: string;
  data: ClinicDto;
}

export const useUpdateClinic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateClinicPayload) => updateClinicApi(id, data),

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["clinics"],
      });

      toast.success(res.data.message || "Clinic updated successfully");
    },

    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};
