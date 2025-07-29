import { api } from "./api";
import {
  ApiResponse,
  PaginatedResponse,
  QueryParams,
} from "../types/api.types";
import { Client, CreateClientData } from "../types/client.types";

export class ClientService {
  private readonly baseUrl = "/clients";

  async getClients(params?: QueryParams): Promise<PaginatedResponse<Client>> {
    const queryString = new URLSearchParams();

    if (params?.page) queryString.append("page", params.page.toString());
    if (params?.limit) queryString.append("limit", params.limit.toString());
    if (params?.search) queryString.append("search", params.search);
    if (params?.sort) queryString.append("sort", params.sort);
    if (params?.filter) {
      Object.entries(params.filter).forEach(([key, value]) => {
        if (value) queryString.append(key, value.toString());
      });
    }

    const url = queryString.toString()
      ? `${this.baseUrl}?${queryString}`
      : this.baseUrl;
    const response = await api.get<PaginatedResponse<Client>>(url);
    return response.data;
  }

  async getClient(id: string): Promise<Client> {
    const response = await api.get<ApiResponse<Client>>(
      `${this.baseUrl}/${id}`
    );
    return response.data.data;
  }

  async createClient(data: CreateClientData): Promise<Client> {
    const response = await api.post<ApiResponse<Client>>(this.baseUrl, data);
    return response.data.data;
  }

  async updateClient(
    id: string,
    data: Partial<CreateClientData>
  ): Promise<Client> {
    const response = await api.put<ApiResponse<Client>>(
      `${this.baseUrl}/${id}`,
      data
    );
    return response.data.data;
  }

  async deleteClient(id: string): Promise<void> {
    await api.delete(`${this.baseUrl}/${id}`);
  }

  async getClientProjects(
    clientId: string,
    params?: QueryParams
  ): Promise<PaginatedResponse<any>> {
    const queryString = new URLSearchParams();
    if (params?.page) queryString.append("page", params.page.toString());
    if (params?.limit) queryString.append("limit", params.limit.toString());

    const url = queryString.toString()
      ? `${this.baseUrl}/${clientId}/projects?${queryString}`
      : `${this.baseUrl}/${clientId}/projects`;

    const response = await api.get<PaginatedResponse<any>>(url);
    return response.data;
  }
}

export const clientService = new ClientService();
