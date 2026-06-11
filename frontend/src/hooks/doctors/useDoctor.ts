"use client";

import { useQuery } from "@tanstack/react-query";
import { getDoctorApi } from "@/api/doctors.api";
import { Doctor } from "@/types/doctor.types";

export const useDoctor = (id: string) => {
  return useQuery<Doctor>({
    queryKey: ["doctor", id],
    queryFn: async () => {
      const res = await getDoctorApi(id);
      return res.data;
    },
    enabled: !!id,
  });
};
