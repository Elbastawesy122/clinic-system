"use client";

import { useQuery } from "@tanstack/react-query";

import { getPatientApi } from "@/api/patient.api";

export const usePatient = (id: string) => {
  return useQuery({
    queryKey: ["patient", id],

    queryFn: async () => {
      const res = await getPatientApi(id);
      return res.data;
    },

    enabled: !!id,
  });
};
