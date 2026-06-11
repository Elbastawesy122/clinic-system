"use client";

import { useQuery } from "@tanstack/react-query";
import { getAppointmentsApi } from "@/api/appointment.api";

export const useAppointments = (page: number, search: string) => {
  return useQuery({
    queryKey: ["appointments", page, search],

    queryFn: async () => {
      const res = await getAppointmentsApi(page, search);
      return res.data;
    },
  });
};
