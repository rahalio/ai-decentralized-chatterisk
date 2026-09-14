import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";

const raw = {
  listByProject: (projectId: string) => apiClient.get(`/v1/projects/${projectId}/comments`),
  get: (commentId: string) => apiClient.get(`/v1/comments/${commentId}`),
  ingest: (projectId: string, body: unknown) => apiClient.post(`/v1/projects/${projectId}/comments`, body),
  redact: (commentId: string) => apiClient.post(`/v1/comments/${commentId}/redact`),
  applyRuling: (commentId: string, body: unknown) => apiClient.post(`/v1/comments/${commentId}/bot-ruling`, body),
  listRulings: () => apiClient.get('/v1/bot-rulings'),
  getRetention: () => apiClient.get('/v1/comments/retention'),
  updateRetention: (body: unknown) => apiClient.put('/v1/comments/retention', body),
  runRetention: () => apiClient.post('/v1/comments/retention/run'),
};
export const commentsService = makeService(raw);
