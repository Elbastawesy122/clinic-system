"use client";

import { useQuery } from "@tanstack/react-query";
import { getAppointmentsApi } from "@/api/appointment";

export const useAppointments = () => {
  return useQuery({
    queryKey: ["appointments"],

    queryFn: async () => {
      const res = await getAppointmentsApi();

      return res.data.appointments;
    },
  });
};
