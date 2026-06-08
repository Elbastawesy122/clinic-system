"use client";

import { useQuery } from "@tanstack/react-query";
import { getDoctorsApi } from "@/api/doctors";
import { DoctorsResponse } from "@/types/doctor.types";

export const useDoctors = (page: number, search: string) => {
  return useQuery<DoctorsResponse>({
    queryKey: ["doctors", page, search],
    queryFn: async () => {
      const res = await getDoctorsApi(page, search);
      return res.data;
    },
  });
};
