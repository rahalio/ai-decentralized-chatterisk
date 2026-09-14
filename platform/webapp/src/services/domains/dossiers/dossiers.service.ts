import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";

const raw = {
  list: () => apiClient.get('/v1/dossiers'),
  get: (id: string) => apiClient.get(`/v1/dossiers/${id}`),
  create: (body: unknown) => apiClient.post('/v1/dossiers', body),
};
export const dossiersService = makeService(raw);
