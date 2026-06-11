"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth-store";

import { getAppointmentsApi } from "@/api/appointment.api";
import { getDoctorAppointmentsApi } from "@/api/appointment.api";
import { getMyAppointmentsApi } from "@/api/appointment.api";

export const useAppointmentsByRole = (page: number, search: string) => {
  const role = useAuthStore((s) => s.user?.role);

  return useQuery({
    queryKey: ["appointments", role, page, search],

    enabled: !!role,

    queryFn: async () => {
      switch (role) {
        case "admin":
          return (await getAppointmentsApi(page, search)).data;

        case "doctor":
          return (await getDoctorAppointmentsApi(page, search)).data;

        case "patient":
        default:
          return (await getMyAppointmentsApi(page, search)).data;
      }
    },
  });
};