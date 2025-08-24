import axios, { AxiosError, isAxiosError } from "axios";

// Axios instance
export const axiosInstanace = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
});

// Optional: Interceptor for logging or global handling
axiosInstanace.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error("API Error:", error.message);
    return Promise.reject(error);
  }
);

// ✅ Helper: Get readable error message
export const isAxiosError = (error: unknown): string => {
  if (isAxiosError(error)) {
    return (
      (error.response?.data as { message?: string })?.message ||
      error.message ||
      "Something went wrong"
    );
  }
  if (error instanceof Error) return error.message;
  return String(error);
};
