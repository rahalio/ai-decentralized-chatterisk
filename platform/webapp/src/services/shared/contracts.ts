export function validateApiResponse<T>(value: T): T {
  return value;
}
export function formatValidationError(err: unknown) {
  return String(err);
}
