import { Fetcher, FetcherRequest } from './Fetcher';
import { ConvertUtils } from '../convert/ConvertUtils';

export type HttpFetcherTarget =
  | URL
  | string
  | { url: URL | string; searchParams?: { [key: string]: any } | URLSearchParams | FormData };
export type HttpFetcherConfig<CONFIG, RESPONSE = Response> = {
  fetch?: RequestInit;
  config?: CONFIG;
  allowedResponseNotOk?: boolean;
  fetchResponseBeforeCallBack?: (config: HttpFetcherConfig<CONFIG, RESPONSE>) => void;
  fetchResponseAfterCallBack?: (data: Response, config: HttpFetcherConfig<CONFIG, RESPONSE>) => void;
  hasResponseErrorChecker?: (data: Response, config: HttpFetcherConfig<CONFIG, RESPONSE>) => any;
};
export type BeforeProxyFetchParams<T = RequestInfo | URL> = {
  requestInfo: T;
  init?: RequestInit;
};
export type AfterProxyFetchParams<T = RequestInfo | URL> = {
  config: BeforeProxyFetchParams<T>;
  response: Response;
};

export abstract class HttpFetcher<
  CONFIG,
  RESPONSE = Response,
  PIPE extends { responseData?: RESPONSE | undefined } = any
> extends Fetcher<HttpFetcherTarget, RESPONSE, HttpFetcherConfig<CONFIG, RESPONSE>, PIPE> {
  get<T = RESPONSE>(
    config: FetcherRequest<HttpFetcherTarget, RESPONSE, HttpFetcherConfig<CONFIG, RESPONSE>, T>
  ): Promise<T> {
    config.config ??= {};
    config.config.fetch = config.config?.fetch ?? {};
    config.config.fetch.method = 'GET';
    return this.fetch(config);
  }

  post<T = RESPONSE>(
    config: FetcherRequest<HttpFetcherTarget, RESPONSE, HttpFetcherConfig<CONFIG, RESPONSE>, T>
  ): Promise<T> {
    config.config ??= {};
    config.config.fetch = config.config?.fetch ?? {};
    config.config.fetch.method = 'POST';
    return this.fetch(config);
  }

  patch<T = RESPONSE>(
    config: FetcherRequest<HttpFetcherTarget, RESPONSE, HttpFetcherConfig<CONFIG, RESPONSE>, T>
  ): Promise<T> {
    config.config ??= {};
    config.config.fetch = config.config?.fetch ?? {};
    config.config.fetch.method = 'PATCH';
    return this.fetch(config);
  }

  put<T = RESPONSE>(
    config: FetcherRequest<HttpFetcherTarget, RESPONSE, HttpFetcherConfig<CONFIG, RESPONSE>, T>
  ): Promise<T> {
    config.config ??= {};
    config.config.fetch = config.config?.fetch ?? {};
    config.config.fetch.method = 'PUT';
    return this.fetch(config);
  }

  head<T = RESPONSE>(
    config: FetcherRequest<HttpFetcherTarget, RESPONSE, HttpFetcherConfig<CONFIG, RESPONSE>, T>
  ): Promise<T> {
    config.config ??= {};
    config.config.fetch = config.config?.fetch ?? {};
    config.config.fetch.method = 'HEAD';
    return this.fetch(config);
  }

  delete<T = RESPONSE>(
    config: FetcherRequest<HttpFetcherTarget, RESPONSE, HttpFetcherConfig<CONFIG, RESPONSE>, T>
  ): Promise<T> {
    config.config ??= {};
    config.config.fetch = config.config?.fetch ?? {};
    config.config.fetch.method = 'DELETE';
    return this.fetch(config);
  }

  protected async beforeProxyFetch<T = RequestInfo | URL>(
    config: BeforeProxyFetchParams<T>
  ): Promise<BeforeProxyFetchParams<T>> {
    return config;
  }
  protected async afterProxyFetch<T = RequestInfo | URL>(config: AfterProxyFetchParams<T>): Promise<Response> {
    return config.response;
  }

  protected async execute(
    target: HttpFetcherTarget,
    config?: HttpFetcherConfig<CONFIG, RESPONSE>
  ): Promise<any | RESPONSE> {
    // target data setting
    if (!(target instanceof URL) && typeof target !== 'string') {
      // const url: URL |  string = target.url;
      // if (typeof target.url === 'string') {
      // }
      const searchParams = new URLSearchParams();
      // const url = typeof target.url === 'string' ? new URL(target.url) : target.url;
      if (typeof target.searchParams === 'string') {
        new URLSearchParams(target.searchParams).forEach((value, key) => {
          searchParams.append(key, value);
        });
      } else if (typeof target.searchParams === 'object') {
        let body = target.searchParams;
        if (typeof FormData !== 'undefined' && body instanceof FormData) {
          body = ConvertUtils.formDataToFormDataEntryValueObj(body);
        }
        const forTarget = body instanceof URLSearchParams ? body.entries() : Object.entries(body);
        for (const [k, v] of Array.from(forTarget)) {
          if (Array.isArray(v)) {
            v.forEach(it => searchParams.append(k, it));
          } else {
            searchParams.append(k, v as any);
          }
        }
      }

      try {
        const url = typeof target.url === 'string' ? new URL(target.url) : target.url;
        searchParams.forEach((value, key) => {
          url.searchParams.append(key, value);
        });
        target = url;
      } catch (e) {
        if (typeof (target as any).url === 'string') {
          const searchParamString = searchParams.toString();
          target = (target as any).url + (searchParamString ? '?' + searchParamString : '');
        } else {
          target = '';
        }
      }
    }
    config?.fetchResponseBeforeCallBack?.(config);
    const beforeData = await this.beforeProxyFetch({ requestInfo: target, init: config?.fetch });
    target = beforeData.requestInfo;
    if (beforeData.init) {
      config ??= {};
      config.fetch = beforeData.init;
    }

    return fetch(target as RequestInfo, config?.fetch).then(async it => {
      it = await this.afterProxyFetch({ config: beforeData, response: it });
      config?.fetchResponseAfterCallBack?.(it, config);
      if (!config?.allowedResponseNotOk && !it.ok) {
        throw it;
      }
      const data = config?.hasResponseErrorChecker?.(it, config);
      if (data) {
        throw data;
      }
      return it;
    });
  }
}
