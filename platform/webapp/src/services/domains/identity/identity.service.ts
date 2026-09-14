import { apiClient } from '@/services/shared/infrastructure';
import { setAccessToken } from '@/services/shared/infrastructure';

export const identityService = {
  login: async (email: string, password: string) => {
    const res = await apiClient.post<any>('/v0/auth/login', { email, password });
    const token = res?.data?.accessToken;
    if (token) setAccessToken(token);
    return res;
  },
  me: () => apiClient.get('/v0/auth/me'),
};
