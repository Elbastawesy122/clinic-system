"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDoctorApi } from "@/api/doctors";
import { DoctorDto } from "@/types/doctor.types";
import { toast } from "sonner";

export const useUpdateDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: DoctorDto }) => updateDoctorApi(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["doctors"],
      });

      toast.success("Doctor Updated");
    },
  });
};
