// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address?: string;
  status: "active" | "inactive";
  createdAt: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  clientId: string;
  clientName: string;
  status: "pending" | "in-progress" | "completed";
  startDate: string;
  endDate: string;
  budget: number;
  createdAt: string;
}
