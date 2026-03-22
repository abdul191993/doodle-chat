import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const apiToken = import.meta.env.VITE_API_TOKEN;

if (!apiBaseUrl) {
  throw new Error("Missing VITE_API_BASE_URL");
}

export const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (apiToken) {
    config.headers.set("Authorization", `Bearer ${apiToken}`);
  }

  return config;
});