import { api } from "@/lib/api";
import { ClinicDto } from "@/types/clinic.types";

export const getClinicsApi = (search = "") => api.get(`/dashboard/clinics?search=${search}`);

export const getClinicApi = (id: string) => api.get(`/dashboard/clinics/${id}`);

export const createClinicApi = (data: ClinicDto) => api.post("/dashboard/clinics", data);

export const updateClinicApi = (id: string, data: ClinicDto) => api.put(`/dashboard/clinics/${id}`, data);

export const deleteClinicApi = (id: string) => api.delete(`/dashboard/clinics/${id}`);

export const toggleClinicStatusApi = (id: string) => api.patch(`/dashboard/clinics/toggle-status/${id}`);
