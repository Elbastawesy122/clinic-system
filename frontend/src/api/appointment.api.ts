import { api } from "@/lib/api";

import { AppointmentDto } from "@/types/appointment.types";

export const createAppointmentApi = (data: AppointmentDto) => api.post("/dashboard/appointments", data);

export const getAppointmentsApi = (page: number, search: string) => api.get(`/dashboard/appointments?page=${page}&search=${search}`);

export const getAppointmentApi = (id: string) => api.get(`/dashboard/appointments/${id}`);

export const updateAppointmentApi = (id: string, data: AppointmentDto) => api.put(`/dashboard/appointments/${id}`, data);

export const deleteAppointmentApi = (id: string) => api.delete(`/dashboard/appointments/${id}`);

export const getMyAppointmentsApi = (page: number, search: string) => api.get(`/dashboard/appointments/my?page=${page}&search=${search}`);

export const getDoctorAppointmentsApi = (page: number, search: string) => api.get(`/dashboard/appointments/doctor?page=${page}&search=${search}`);

export const updateAppointmentStatusApi = (id: string, status: string) =>
  api.patch(`/dashboard/appointments/status/${id}`, {
    status,
  });

export const cancelAppointmentApi = (id: string) => api.patch(`/dashboard/appointments/cancel/${id}`);
