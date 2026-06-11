"use client";

import { useQuery } from "@tanstack/react-query";

import { getPatientsApi } from "@/api/patient.api";

export const usePatients = (page: number, search: string) => {
  return useQuery({
    queryKey: ["patients", page, search],

    queryFn: async () => {
      const res = await getPatientsApi(page, search);
      return res.data;
    },
  });
};
