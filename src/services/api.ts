import axios, { AxiosInstance } from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API;

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
