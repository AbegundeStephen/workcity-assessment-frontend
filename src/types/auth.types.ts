export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
}
