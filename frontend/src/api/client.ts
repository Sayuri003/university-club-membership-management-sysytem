// Re-exported so auth pages can catch errors with a .message.
export class ApiError extends Error {
  status: number;
  details?: unknown;
  constructor(message: string, status = 400, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

// Legacy request() kept for any code still importing it; routes to nothing now.
export async function request<T>(_path: string, _opts: unknown = {}): Promise<T> {
  throw new ApiError('Backend is not configured. Use the local API clients instead.', 503);
}
