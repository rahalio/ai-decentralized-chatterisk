const TOKEN_KEY = 'chatterisk.accessToken';
const API_KEY_KEY = 'chatterisk.apiKey';

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function setAccessToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}
export function clearAccessToken() {
  localStorage.removeItem(TOKEN_KEY);
}
export function getApiKey() {
  return localStorage.getItem(API_KEY_KEY) ?? 'ddd_demo_local_dev_key';
}

export async function apiClient<T = unknown>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  const token = getAccessToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);
  headers.set('X-API-Key', getApiKey());
  if (init.body) {
    headers.set('Content-Type', 'application/json');
  }
  if (init.method && init.method !== 'GET') {
    headers.set('Idempotency-Key', crypto.randomUUID());
  }
  const res = await fetch(path, { ...init, headers });
  if (res.status === 204) return undefined as T;
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.detail || json.message || json.title || res.statusText);
  }
  return json as T;
}

apiClient.get = <T = unknown>(path: string) => apiClient<T>(path);
apiClient.post = <T = unknown>(path: string, body?: unknown) =>
  apiClient<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined });
apiClient.patch = <T = unknown>(path: string, body?: unknown) =>
  apiClient<T>(path, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined });
apiClient.put = <T = unknown>(path: string, body?: unknown) =>
  apiClient<T>(path, { method: 'PUT', body: body ? JSON.stringify(body) : undefined });
apiClient.delete = <T = unknown>(path: string) => apiClient<T>(path, { method: 'DELETE' });

export function makeService<T extends Record<string, unknown>>(raw: T): T {
  return raw;
}

export function getEffectiveOrgId() {
  return 'tnt_demo';
}

export { apiClient as default };
