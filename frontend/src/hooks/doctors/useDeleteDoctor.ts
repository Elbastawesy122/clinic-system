"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoctorApi } from "@/api/doctors";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useDeleteDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDoctorApi,

    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      toast.success(res.data.message || "Doctor deleted");
    },

    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err?.response?.data?.message || "Error deleting doctor");
    },
  });
};
