export interface Client {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address?: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  projectsCount?: number;
}

export interface CreateClientData {
  name: string;
  email: string;
  phone: string;
  company: string;
  address?: string;
  status: "active" | "inactive";
}

export interface UpdateClientData extends Partial<CreateClientData> {
  _id: string;
}

export interface ClientFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  status: "active" | "inactive";
}
