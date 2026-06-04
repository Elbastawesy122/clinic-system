import { api } from "@/lib/api";

import { CreateAppointmentDto, UpdateAppointmentDto } from "@/types/appointment.types";

export const getAppointmentsApi = () => api.get("/dashboard/appointments");

export const createAppointmentApi = (data: CreateAppointmentDto) => api.post("/dashboard/appointments", data);

export const updateAppointmentApi = (id: string, data: UpdateAppointmentDto) => api.put(`/dashboard/appointments/${id}`, data);

export const deleteAppointmentApi = (id: string) => api.delete(`/dashboard/appointments/${id}`);
