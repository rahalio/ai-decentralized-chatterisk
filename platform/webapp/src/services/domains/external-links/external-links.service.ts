import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";

const raw = {
  list: (projectId?: string) => apiClient.get(`/v1/external-links${projectId ? `?projectId=${projectId}` : ''}`),
  create: (body: unknown) => apiClient.post('/v1/external-links', body),
  remove: (linkId: string) => apiClient.delete(`/v1/external-links/${linkId}`),
};
export const externalLinksService = makeService(raw);
