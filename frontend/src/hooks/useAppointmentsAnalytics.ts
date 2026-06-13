"use client";

import { useQuery } from "@tanstack/react-query";
import { getAppointmentsAnalyticsApi } from "@/api/dashboard.api";

export interface AppointmentAnalytics {
  month: string;
  appointments: number;
}

export const useAppointmentsAnalytics = () => {
  return useQuery<AppointmentAnalytics[]>({
    queryKey: ["appointments-analytics"],

    queryFn: async () => {
      const res = await getAppointmentsAnalyticsApi();
      return res.data;
    },
  });
};
