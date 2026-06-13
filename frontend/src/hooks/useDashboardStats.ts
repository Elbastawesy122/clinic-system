"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardStatsApi } from "@/api/dashboard.api";

export interface DashboardStats {
  appointments: number;
  doctors: number;
  clinics: number;
  patients: number;
}

export const useDashboardStats = () => {
  return useQuery<DashboardStats>({
    queryKey: ["dashboard-stats"],

    queryFn: async () => {
      const res = await getDashboardStatsApi();
      return res;
    },
  });
};
