"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth-store";

import { getPatientsApi } from "@/api/patient.api";
import { getDoctorPatientsApi } from "@/api/doctors.api";

import { PatientsResponse } from "@/types/patient.types";

export const usePatientsByRole = (page: number, search: string) => {
  const role = useAuthStore((s) => s.user?.role);

  return useQuery<PatientsResponse>({
    queryKey: ["patients", role, page, search],

    enabled: !!role,

    queryFn: async (): Promise<PatientsResponse> => {
      if (role === "admin") {
        const res = await getPatientsApi(page, search);
        return res;
      }

      if (role === "doctor") {
        const res = await getDoctorPatientsApi(page, search);
        return res.data;
      }

      return {
        patients: [],
        totalPatients: 0,
        totalPages: 0,
        currentPage: 1,
      };
    },
  });
};