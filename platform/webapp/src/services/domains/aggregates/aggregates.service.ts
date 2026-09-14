import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";

const raw = {
  listByProject: (projectId: string, window = '7d') => apiClient.get(`/v1/projects/${projectId}/aggregates?window=${window}`),
  latest: (q: { projectId?: string; contractAddress?: string; window?: string }) => {
    const p = new URLSearchParams();
    if (q.projectId) p.set('projectId', q.projectId);
    if (q.contractAddress) p.set('contractAddress', q.contractAddress);
    p.set('window', q.window ?? '7d');
    return apiClient.get(`/v1/aggregates/latest?${p}`);
  },
  badge: (contractAddress: string) => apiClient.get(`/v1/partner/risk-badge?contractAddress=${encodeURIComponent(contractAddress)}`),
};
export const aggregatesService = makeService(raw);
