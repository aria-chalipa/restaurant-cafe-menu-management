export interface FetchConfig<T> {
    baseURL ?: string;
    body?: T | null;
    cache?: RequestCache;
    headers?: HeadersInit;
    keepalive?: boolean;
    method?: 'POST' | "PUT" | "DELETE" | "GET";
    mode?: RequestMode;
    priority?: RequestPriority;
    redirect?: RequestRedirect;
    referrer?: string;
    referrerPolicy?: ReferrerPolicy;
    signal?: AbortSignal | null;
    window?: null;
    retry ?: number | false;
    retryStatusCodes ?: number[];
}