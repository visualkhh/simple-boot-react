import { HttpFetcher, HttpFetcherConfig, HttpFetcherTarget } from './HttpFetcher';
import { FetcherRequest } from './Fetcher';

export type HttpJsonFetcherConfig<C, R> = HttpFetcherConfig<C> & {
  bypassTransform?: boolean;
  transformText?: boolean;
  // parsingExceptionDefault?: (e: any) => any;
  executeTransform?: (response: Response) => Promise<R>;
};
type RequestJsonInit = Omit<RequestInit, 'body'> & { body?: any | BodyInit | null };
type HttpAnyBodyFetcherConfig<C, R> = Omit<HttpJsonFetcherConfig<C, R>, 'fetch'> & { fetch?: RequestJsonInit };

export class HttpJsonResponseError<T = any> {
  public body?: T;
  public response?: Response;
}

export abstract class HttpJsonFetcher<C, PIPE extends { responseData?: any }> extends HttpFetcher<C, any, PIPE> {
  private updateJsonFetchConfigAndData<R, T = R>(
    config: FetcherRequest<HttpFetcherTarget, R, HttpJsonFetcherConfig<C, R>, T>
  ) {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*'
    };
    config.config ??= {};
    config.config.fetch ??= {};
    config.config.fetch.headers ??= {};
    config.config!.fetch!.headers = { ...config.config!.fetch?.headers, ...headers };
    if (config.config?.fetch?.body && typeof config.config?.fetch?.body !== 'string') {
      config.config.fetch.body = JSON.stringify(config.config.fetch.body);
    }
    return config;
  }

  get<R, T = R>(config: FetcherRequest<HttpFetcherTarget, R, HttpJsonFetcherConfig<C, R>, T>): Promise<T> {
    this.errorTransfrom(config);
    return super.get(config);
  }

  delete<R, T = R>(config: FetcherRequest<HttpFetcherTarget, R, HttpJsonFetcherConfig<C, R>, T>): Promise<T> {
    this.errorTransfrom(config);
    return super.delete(config);
  }

  post<R, T = R>(config: FetcherRequest<HttpFetcherTarget, R, HttpJsonFetcherConfig<C, R>, T>): Promise<T> {
    this.errorTransfrom(config);
    return super.post(config);
  }

  patch<R, T = R>(config: FetcherRequest<HttpFetcherTarget, R, HttpJsonFetcherConfig<C, R>, T>): Promise<T> {
    this.errorTransfrom(config);
    return super.patch(config);
  }

  put<R, T = R>(config: FetcherRequest<HttpFetcherTarget, R, HttpJsonFetcherConfig<C, R>, T>): Promise<T> {
    this.errorTransfrom(config);
    return super.put(config);
  }

  head<R, T = R>(config: FetcherRequest<HttpFetcherTarget, R, HttpJsonFetcherConfig<C, R>, T>): Promise<T> {
    this.errorTransfrom(config);
    return super.head(config);
  }

  postJson<R, T = R>(config: FetcherRequest<HttpFetcherTarget, R, HttpAnyBodyFetcherConfig<C, R>, T>): Promise<T> {
    this.errorTransfrom(config);
    return super.post(this.updateJsonFetchConfigAndData(config));
  }

  patchJson<R, T = R>(config: FetcherRequest<HttpFetcherTarget, R, HttpAnyBodyFetcherConfig<C, R>, T>): Promise<T> {
    this.errorTransfrom(config);
    return super.patch(this.updateJsonFetchConfigAndData(config));
  }

  putJson<R, T = R>(config: FetcherRequest<HttpFetcherTarget, R, HttpAnyBodyFetcherConfig<C, R>, T>): Promise<T> {
    this.errorTransfrom(config);
    return super.put(this.updateJsonFetchConfigAndData(config));
  }

  errorTransfrom<R, T = R>(config: FetcherRequest<HttpFetcherTarget, R, HttpAnyBodyFetcherConfig<C, R>, T>) {
    const old = config.errorTransform;
    config.errorTransform = async e => {
      if (old) {
        return old(e);
      } else {
        const httpJsonResponseError = new HttpJsonResponseError();
        if (e instanceof Response) {
          httpJsonResponseError.response = e;
          try {
            httpJsonResponseError.body = await e.clone().json();
          } catch (e) {}
        } else {
          httpJsonResponseError.body = e;
        }
        return httpJsonResponseError;
      }
    };
  }

  protected execute(target: HttpFetcherTarget, config?: HttpJsonFetcherConfig<C, any>): Promise<any> {
    return super.execute(target, config).then((it: Response) => {
      if (config?.bypassTransform) {
        return it;
      }
      if (config?.executeTransform) {
        return config.executeTransform(it);
      } else {
        if (config?.transformText) {
          return it?.text();
        } else {
          return it?.json?.();
        }
      }
    });
    // .catch(e => {
    //   if (config?.parsingExceptionDefault) {
    //     return config.parsingExceptionDefault(e);
    //   } else {
    //     throw e;
    //   }
    // });
  }
}
