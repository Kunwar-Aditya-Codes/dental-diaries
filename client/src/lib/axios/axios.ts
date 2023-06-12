import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "http://localhost:4000/api",
  baseURL: "https://dental-diaries.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const privateAxiosInstance = axios.create({
  // baseURL: "http://localhost:4000/api",
  baseURL: "https://dental-diaries.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
