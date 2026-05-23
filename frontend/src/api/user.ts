import { api } from "@/lib/api";

export const updateUserApi = (
  id: string,
  data: {
    name: string;
    email: string;
  },
) => api.put(`/users/${id}`, data);

export const deleteUserApi = (id: string) => api.delete(`/users/${id}`);
