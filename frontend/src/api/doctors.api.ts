import { api } from "@/lib/api";
import { DoctorDto } from "@/types/doctor.types";

export const getDoctorsApi = (page: number, search: string) => api.get(`/dashboard/doctors?page=${page}&search=${search}`);

export const getDoctorApi = (id: string) => api.get(`/dashboard/doctors/${id}`);

export const createDoctorApi = (data: DoctorDto) => api.post("/dashboard/doctors", data);

export const updateDoctorApi = (id: string, data: DoctorDto) => api.put(`/dashboard/doctors/${id}`, data);

export const deleteDoctorApi = (id: string) => api.delete(`/dashboard/doctors/${id}`);

export const setupDoctorPasswordApi = (token: string, password: string) => api.post(`/dashboard/doctors/setup-password/${token}`, { password });
