"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyAppointmentsApi } from "@/api/appointment.api";

export const useMyAppointments = (page: number, search: string) => {
  return useQuery({
    queryKey: ["my-appointments", page, search],

    queryFn: async () => {
      const res = await getMyAppointmentsApi(page, search);
      return res.data;
    },
  });
};