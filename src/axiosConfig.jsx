import axios from "axios";
import { redirectToLogin } from "./utils/tokenUtils";

const axiosInstance = axios.create({
  // ✅ Use relative path for production so nginx proxy works
  baseURL: "/api",

  headers: { "Content-Type": "application/json" },
});

// Request interceptor to add token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      redirectToLogin();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
