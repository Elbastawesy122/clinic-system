"use client";

import { useQuery } from "@tanstack/react-query";
import { getDoctorsApi } from "@/api/doctors";
import { Doctor } from "@/types/doctor.types";

export const useDoctors = () => {
  return useQuery<Doctor[]>({
    queryKey: ["doctors"],

    queryFn: async () => {
      const res = await getDoctorsApi();

      return res.data;
    },
  });
};
