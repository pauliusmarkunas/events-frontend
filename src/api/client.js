import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const client = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.dispatchEvent(new CustomEvent("unauthorized"));
    }
    return Promise.reject(error);
  }
);

export default client;
