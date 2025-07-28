import { Project } from "./project.types";
import { Client } from "./client.types";
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string>;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  filter?: Record<string, any>;
}

// Common UI Types
export interface SelectOption {
  value: string;
  label: string;
}

export interface TableColumn<T = any> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export interface ButtonProps {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  className?: string;
}

export interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: Record<keyof T, string>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Dashboard types
export interface DashboardStats {
  totalClients: number;
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  pendingProjects: number;
  recentProjects: Project[];
  recentClients: Client[];
}

// Search and filter types
export interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: Record<string, any>) => void;
  onSort: (field: string, direction: "asc" | "desc") => void;
  searchQuery?: string;
  filters?: Record<string, any>;
  sortField?: string;
  sortDirection?: "asc" | "desc";
}

// Notification types
export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  duration?: number;
}

// Route types
export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  protected: boolean;
  adminOnly?: boolean;
  exact?: boolean;
}
