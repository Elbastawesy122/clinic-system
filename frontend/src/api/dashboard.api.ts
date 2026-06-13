import { api } from "@/lib/api";

export const getDashboardStatsApi = async () => {
  const { data } = await api.get("/dashboard/stats");
  return data;
};

export const getAppointmentsAnalyticsApi = async () => {
  const { data } = await api.get("/dashboard/appointments/analytics");
  return data;
};
