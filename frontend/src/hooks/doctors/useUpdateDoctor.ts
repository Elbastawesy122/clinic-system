"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDoctorApi } from "@/api/doctors";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { DoctorDto } from "@/types/doctor.types";

export const useUpdateDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: {id: string , data:DoctorDto}) => updateDoctorApi(id, data),

    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      toast.success(res.data.message || "Doctor updated");
    },

    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err?.response?.data?.message || "Error updating doctor");
    },
  });
};