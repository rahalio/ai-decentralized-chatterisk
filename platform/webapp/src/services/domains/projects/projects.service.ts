import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";

const raw = {
  list: (watched?: boolean) => apiClient.get(`/v1/projects${watched ? '?watched=true' : ''}`),
  get: (projectId: string) => apiClient.get(`/v1/projects/${projectId}`),
  create: (body: unknown) => apiClient.post('/v1/projects', body),
  watch: (projectId: string) => apiClient.post(`/v1/projects/${projectId}/watch`),
  unwatch: (projectId: string) => apiClient.delete(`/v1/projects/${projectId}/watch`),
};
export const projectsService = makeService(raw);
