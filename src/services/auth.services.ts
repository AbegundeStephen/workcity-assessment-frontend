import { api } from "./api";
import {
  AuthResponse,
  LoginCredentials,
  SignupData,
  User,
} from "../types/auth.types";

export class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  }

  async signup(data: SignupData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/signup", {
      name: data.name,
      email: data.email,
      password: data.password,
    });
    return response.data;
  }

  async getProfile(): Promise<User> {
    const response = await api.get<{ success: boolean; data: User }>(
      "/auth/profile"
    );
    return response.data.data;
  }

  async refreshToken(): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/refresh");
    return response.data;
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  getStoredToken(): string | null {
    return localStorage.getItem("token");
  }

  getStoredUser(): User | null {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }

  storeAuthData(token: string, user: User): void {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }
}

export const authService = new AuthService();
