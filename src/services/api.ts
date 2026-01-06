import axios from "axios";

const isDev = process.env.NODE_ENV === "development";
// pick NEXT_PUBLIC_API_URL_DEV in dev, NEXT_PUBLIC_API_URL_PROD in prod
const baseURL = isDev
  ? process.env.NEXT_PUBLIC_API_URL_DEV
  : process.env.NEXT_PUBLIC_API_URL_PROD;

const api = axios.create({
  baseURL,
  withCredentials: true, // critical for sending cookies!
});

export default api;