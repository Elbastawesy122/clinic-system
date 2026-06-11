"use client";

import { useQuery } from "@tanstack/react-query";

import { getClinicsApi } from "@/api/clinic.api";

import { ClinicsResponse } from "@/types/clinic.types";

export const useClinics = (search: string) => {
  return useQuery<ClinicsResponse>({
    queryKey: ["clinics", search],

    queryFn: async () => {
      const res = await getClinicsApi(search);

      return res.data;
    },
  });
};
