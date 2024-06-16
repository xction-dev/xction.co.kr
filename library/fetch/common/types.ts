type Api = {
  get: <T>(url: string, headers?: HeadersInit) => Promise<T>;
  post: <T>(
    url: string,
    body?: Record<string, unknown> | File,
    headers?: HeadersInit,
  ) => Promise<T>;
  patch: <T>(
    url: string,
    body?: Record<string, unknown> | File,
    headers?: HeadersInit,
  ) => Promise<T>;
  put: <T>(
    url: string,
    body?: Record<string, unknown> | File,
    headers?: HeadersInit,
  ) => Promise<T>;
  delete: <T>(
    url: string,
    body?: Record<string, unknown> | File,
    headers?: HeadersInit,
  ) => Promise<T>;
};

export type CreateFetch = (config: {
  baseUrl: string;
  getAuth?: () => string | undefined | null;
}) => { api: Api; authApi: Api };
