import axios from "axios";
import { store } from "../app/store";
import { logout } from "../features/auth/slices/authSlice";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post("/login/refresh-token", {}, {
          withCredentials: true,
        });
        return api(originalRequest);
      } catch (_error) {
        store.dispatch(logout());
        return Promise.reject(_error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
