import { api } from "@/lib/api";

export const updateUserApi = (
  id: string,
  formData: FormData
) => api.put(`/users/${id}`, formData);

export const deleteUserApi = (id: string) => api.delete(`/users/${id}`);
