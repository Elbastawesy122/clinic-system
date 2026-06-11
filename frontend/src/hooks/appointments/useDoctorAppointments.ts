"use client";

import { useQuery } from "@tanstack/react-query";
import { getDoctorAppointmentsApi } from "@/api/appointment.api";

export const useDoctorAppointments = (page: number, search: string) => {
  return useQuery({
    queryKey: ["doctor-appointments", page, search],

    queryFn: async () => {
      const res = await getDoctorAppointmentsApi(page, search);
      return res.data;
    },
  });
};