export interface Project {
  _id: string;
  title: string;
  description: string;
  clientId: string | ClientReference;
  status: "pending" | "in-progress" | "completed";
  startDate: string;
  endDate?: string;
  budget?: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClientReference {
  _id: string;
  name: string;
  email: string;
  company: string;
}

export interface CreateProjectData {
  title: string;
  description: string;
  clientId: string;
  status: "pending" | "in-progress" | "completed";
  startDate: string;
  endDate?: string;
  budget?: number;
}

export interface UpdateProjectData extends Partial<CreateProjectData> {
  _id: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  clientId: string;
  status: "pending" | "in-progress" | "completed";
  startDate: string;
  endDate: string;
  budget: string;
}

export interface ProjectFilters {
  status?: string;
  clientId?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}
