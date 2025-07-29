import { api } from "./api";
import {
  Project,
  CreateProjectData,
  UpdateProjectData,
  ProjectFilters, 
} from "../types/project.types";
import { ApiResponse, PaginatedResponse, QueryParams } from "@/types/api.types";

export class ProjectService {
  private readonly baseUrl = "/projects";

  async getProjects(
    params?: QueryParams & ProjectFilters
  ): Promise<PaginatedResponse<Project>> {
    const queryString = new URLSearchParams();

    if (params?.page) queryString.append("page", params.page.toString());
    if (params?.limit) queryString.append("limit", params.limit.toString());
    if (params?.search) queryString.append("search", params.search);
    if (params?.sort) queryString.append("sort", params.sort);
    if (params?.status) queryString.append("status", params.status);
    if (params?.clientId) queryString.append("clientId", params.clientId);
    if (params?.startDate) queryString.append("startDate", params.startDate);
    if (params?.endDate) queryString.append("endDate", params.endDate);

    const url = queryString.toString()
      ? `${this.baseUrl}?${queryString}`
      : this.baseUrl;
    const response = await api.get<PaginatedResponse<Project>>(url);
    return response.data;
  }

  async getProject(id: string): Promise<Project> {
    const response = await api.get<ApiResponse<Project>>(
      `${this.baseUrl}/${id}`
    );
    return response.data.data;
  }

  async createProject(data: CreateProjectData): Promise<Project> {
    const response = await api.post<ApiResponse<Project>>(this.baseUrl, data);
    return response.data.data;
  }

  async updateProject(
    id: string,
    data: Partial<CreateProjectData>
  ): Promise<Project> {
    const response = await api.put<ApiResponse<Project>>(
      `${this.baseUrl}/${id}`,
      data
    );
    return response.data.data;
  }

  async deleteProject(id: string): Promise<void> {
    await api.delete(`${this.baseUrl}/${id}`);
  }

  async getProjectsByClient(
    clientId: string,
    params?: QueryParams
  ): Promise<PaginatedResponse<Project>> {
    const queryString = new URLSearchParams();
    if (params?.page) queryString.append("page", params.page.toString());
    if (params?.limit) queryString.append("limit", params.limit.toString());

    const url = queryString.toString()
      ? `${this.baseUrl}/client/${clientId}?${queryString}`
      : `${this.baseUrl}/client/${clientId}`;

    const response = await api.get<PaginatedResponse<Project>>(url);
    return response.data;
  }
}

export const projectService = new ProjectService();
