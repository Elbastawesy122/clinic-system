"use client";

import { useQuery } from "@tanstack/react-query";
import { getAppointmentApi } from "@/api/appointment.api";

export const useAppointment = (id: string) => {
  return useQuery({
    queryKey: ["appointment", id],

    queryFn: async () => {
      const res = await getAppointmentApi(id);
      return res.data;
    },

    enabled: !!id,
  });
};