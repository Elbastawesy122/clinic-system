import axios from "axios";
import { useAuthStore } from "@/store/auth-store";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;  

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/refresh-token",
          {},
          {
            withCredentials: true,
          },
        );

        const newToken = res.data.accessToken;

        useAuthStore.getState().setAccessToken(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (err) {
        useAuthStore.getState().logout();

        window.location.href = "/user/login";
      }
    }

    return Promise.reject(error);
  },
);
