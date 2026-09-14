import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";

const raw = {
  list: () => apiClient.get('/v1/alerts'),
  acknowledge: (alertId: string) => apiClient.post(`/v1/alerts/${alertId}/acknowledge`),
  snooze: (alertId: string, body: unknown) => apiClient.post(`/v1/alerts/${alertId}/snooze`, body),
  listPolicies: () => apiClient.get('/v1/alert-policies'),
  createPolicy: (body: unknown) => apiClient.post('/v1/alert-policies', body),
  updatePolicy: (policyId: string, body: unknown) => apiClient.patch(`/v1/alert-policies/${policyId}`, body),
};
export const alertsService = makeService(raw);
