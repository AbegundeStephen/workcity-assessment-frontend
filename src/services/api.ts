import axios, { AxiosInstance, AxiosResponse } from "axios";
import toast from "react-hot-toast";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Log requests in development
        if (process.env.NODE_ENV === "development") {
          console.log(
            `🚀 ${config.method?.toUpperCase()} ${config.url}`,
            config.data
          );
        }

        return config;
      },
      (error) => {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log responses in development
        if (process.env.NODE_ENV === "development") {
          console.log(
            `✅ ${response.config.method?.toUpperCase()} ${
              response.config.url
            }`,
            response.data
          );
        }

        return response;
      },
      (error) => {
        console.error("Response interceptor error:", error);

        // Handle common errors
        if (error.response) {
          const { status, data } = error.response;

          switch (status) {
            case 401:
              // Unauthorized - clear token and redirect to login
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/login";
              toast.error("Session expired. Please login again.");
              break;

            case 403:
              toast.error("You do not have permission to perform this action.");
              break;

            case 404:
              toast.error("Resource not found.");
              break;

            case 422:
              // Validation errors
              if (data.errors) {
                Object.values(data.errors).forEach((error: any) => {
                  toast.error(error);
                });
              } else {
                toast.error(data.message || "Validation error occurred.");
              }
              break;

            case 500:
              toast.error("Internal server error. Please try again later.");
              break;

            default:
              toast.error(data.message || "An unexpected error occurred.");
          }
        } else if (error.request) {
          toast.error("Network error. Please check your connection.");
        } else {
          toast.error("An unexpected error occurred.");
        }

        return Promise.reject(error);
      }
    );
  }

  public getInstance(): AxiosInstance {
    return this.api;
  }
}

export const apiService = new ApiService();
export const api = apiService.getInstance();
