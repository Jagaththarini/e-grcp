import axios from "axios";
import { store } from "../store";
import { setSessionExpired } from "../store/slices/authSlice";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/* ------------------------- Request Interceptor ------------------------- */

apiClient.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token.trim()}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ------------------------- Response Interceptor ------------------------- */

apiClient.interceptors.response.use(
  (response) => response.data,

  (error) => {
    if (import.meta.env.DEV) {
      console.error("API Error:", error);
    }

    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          return Promise.reject(
            new Error(data?.message || "Bad request.")
          );

        case 401:
          store.dispatch(setSessionExpired(true));
          return Promise.reject(
            new Error("Session expired. Please log in again.")
          );

        case 403:
          return Promise.reject(
            new Error(
              "You do not have permission to perform this action."
            )
          );

        case 404:
          return Promise.reject(
            new Error("Requested resource not found.")
          );

        case 408:
          return Promise.reject(
            new Error("Request timed out.")
          );

        default:
          if (status >= 500) {
            return Promise.reject(
              new Error(
                "Internal server error. Please try again later."
              )
            );
          }

          return Promise.reject(
            new Error(data?.message || "Request failed.")
          );
      }
    }

    if (error.request) {
      return Promise.reject(
        new Error(
          "Network error. Please check your internet connection."
        )
      );
    }

    return Promise.reject(
      new Error(error.message || "Unexpected error occurred.")
    );
  }
);

/* ------------------------- Helper Methods ------------------------- */

export const get = (url, config) =>
  apiClient.get(url, config);

export const post = (url, data, config) =>
  apiClient.post(url, data, config);

export const put = (url, data, config) =>
  apiClient.put(url, data, config);

export const patch = (url, data, config) =>
  apiClient.patch(url, data, config);

export const remove = (url, config) =>
  apiClient.delete(url, config);

export default apiClient;