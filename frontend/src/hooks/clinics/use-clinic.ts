"use client";

import { useQuery } from "@tanstack/react-query";

import { getClinicApi } from "@/api/clinic.api";

import { Clinic } from "@/types/clinic.types";

export const useClinic = (id: string) => {
  return useQuery<Clinic>({
    queryKey: ["clinic", id],

    queryFn: async () => {
      const res = await getClinicApi(id);

      return res.data;
    },

    enabled: !!id,
  });
};
