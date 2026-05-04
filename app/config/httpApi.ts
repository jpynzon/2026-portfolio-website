type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type HttpApiFetchOptions = Omit<Parameters<typeof $fetch>[1], 'method' | 'baseURL'>

type HttpApiFetchResult<T> = Promise<T>

export interface HttpApi {
  get<T>(url: string, options?: HttpApiFetchOptions): HttpApiFetchResult<T>
  post<T>(url: string, options?: HttpApiFetchOptions): HttpApiFetchResult<T>
  put<T>(url: string, options?: HttpApiFetchOptions): HttpApiFetchResult<T>
  patch<T>(url: string, options?: HttpApiFetchOptions): HttpApiFetchResult<T>
  delete<T>(url: string, options?: HttpApiFetchOptions): HttpApiFetchResult<T>
  request<T>(url: string, options?: Omit<Parameters<typeof $fetch>[1], 'baseURL'>): HttpApiFetchResult<T>
}

const request = async <T>(url: string, method: HttpMethod, baseURL: string, options: HttpApiFetchOptions = {}): HttpApiFetchResult<T> => {
  return $fetch<T>(url, {
    method,
    baseURL,
    ...options
  }) as Promise<T>
}

export const createHttpApi = (baseURL: string): HttpApi => {
  return {
    get: <T>(url: string, options?: HttpApiFetchOptions) => request<T>(url, 'GET', baseURL, options),
    post: <T>(url: string, options?: HttpApiFetchOptions) => request<T>(url, 'POST', baseURL, options),
    put: <T>(url: string, options?: HttpApiFetchOptions) => request<T>(url, 'PUT', baseURL, options),
    patch: <T>(url: string, options?: HttpApiFetchOptions) => request<T>(url, 'PATCH', baseURL, options),
    delete: <T>(url: string, options?: HttpApiFetchOptions) => request<T>(url, 'DELETE', baseURL, options),
    request: <T>(url: string, options?: Omit<Parameters<typeof $fetch>[1], 'baseURL'>) => $fetch<T>(url, {
      baseURL,
      ...options
    }) as Promise<T>
  }
}

export const useHttpApi = (base: 'static' | 'backend' = 'static') => {
  const { public: publicConfig } = useRuntimeConfig()
  const baseURL = base === 'backend' ? publicConfig.apiBase : publicConfig.staticApiBase
  return createHttpApi(baseURL)
}
