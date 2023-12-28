import axios from "axios";

export const customAxios = axios.create({
  baseURL: `${import.meta.env.VITE_REST_API_URL}/api/v${import.meta.env.VITE_REST_API_VERSION}`
});