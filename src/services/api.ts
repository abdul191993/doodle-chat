import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const apiToken = import.meta.env.VITE_API_TOKEN;

if (!apiBaseUrl) {
  throw new Error("Missing VITE_API_BASE_URL");
}

export const api = axios.create();

api.interceptors.request.use((config) => {
  config.baseURL = apiBaseUrl;
  config.headers.set("Content-Type", "application/json");
  config.headers.set("Accept", "application/json");

  if (apiToken) {
    config.headers.set("Authorization", `Bearer ${apiToken}`);
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Handle unauthorized - could clear user session or redirect to login
      console.error("Authentication error:", error);
    }
    return Promise.reject(error);
  }
);
