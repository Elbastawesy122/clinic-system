import { api } from "@/lib/api";

export const getPatientsApi = async (page: number, search: string) => {
  const { data } = await api.get(`/users/dashboard/patients?page=${page}&search=${search}`);

  return data;
};

export const getPatientApi = async (id: string) => {
  const { data } = await api.get(`/users/dashboard/patients/${id}`);

  return data;
};

export const deletePatientApi = async (id: string) => {
  const { data } = await api.delete(`/users/${id}`);

  return data;
};

export const blockPatientApi = async (id: string) => {
  const { data } = await api.patch(`/users/block/${id}`);

  return data;
};

export const unblockPatientApi = async (id: string) => {
  const { data } = await api.patch(`/users/unblock/${id}`);

  return data;
};
