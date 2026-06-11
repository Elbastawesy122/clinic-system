import axios from "axios";
import { useAuthStore } from "@/store/auth-store";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

/*
|--------------------------------------------------------------------------
| Request Interceptor
|--------------------------------------------------------------------------
*/
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/*
|--------------------------------------------------------------------------
| Response Interceptor (Refresh Token Logic)
|--------------------------------------------------------------------------
*/
api.interceptors.response.use(
  (res) => res,

  async (error) => {
    const originalRequest = error.config;

    // لو مفيش response أو request مش موجود
    if (!error.response || !originalRequest) {
      return Promise.reject(error);
    }

    // منع loop
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // لو Unauthorized
    if (error.response.status === 401) {
      originalRequest._retry = true;

      try {
        const res = await axios.post("http://localhost:5000/api/auth/refresh-token", {}, { withCredentials: true });

        const newToken = res.data.accessToken;

        useAuthStore.getState().setAccessToken(newToken);

        // إعادة إضافة التوكن
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newToken}`,
        };

        // 🔥 مهم: إعادة الطلب بشكل آمن
        return api(originalRequest);
      } catch (err) {
        useAuthStore.getState().logout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);
