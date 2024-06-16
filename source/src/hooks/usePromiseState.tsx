import { ValidUtils } from '../valid/ValidUtils';
import { RandomUtils } from '../random/RandomUtils';
import React, { DependencyList, useMemo } from 'react';

export enum StateHookState {
  READY = 'ready',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export type StateHookCacheKey = (string | any[] | object) | (() => string | any[] | object);
export type StateHookCache<T, RP = void> = {
  key: StateHookCacheKey;
  factory: (args: RP) => Promise<T>;
  cacheCleanup?: boolean | (() => boolean);
  cacheTime: number | (() => number);
};
export type CacheSet<T = any> = { data: T; timer: any; cacheTime: number };
export type CatchStorage = {
  get<T>(key: StateHookCacheKey): CacheSet<T> | undefined;
  set(key: StateHookCacheKey, value: CacheSet): CatchStorage;
  delete(key: StateHookCacheKey): boolean;
  clear(): void;
};
const stateHookCache: CatchStorage = ValidUtils.isBrowser()
  ? new (class implements CatchStorage {
    private storage = new Map<string, CacheSet>();

    get(key: StateHookCacheKey): CacheSet | undefined {
      return this.storage.get(JSON.stringify(key));
    }

    set(key: StateHookCacheKey, value: CacheSet): this {
      this.storage.set(JSON.stringify(key), value);
      return this;
    }

    delete(key: StateHookCacheKey): boolean {
      return this.storage.delete(JSON.stringify(key));
    }

    clear() {
      this.storage.clear();
    }
  })()
  : new (class implements CatchStorage {
    get(key: StateHookCacheKey): CacheSet | undefined {
      return undefined;
    }

    set(key: StateHookCacheKey, value: CacheSet): this {
      return this;
    }

    delete(key: StateHookCacheKey): boolean {
      return false;
    }

    clear() {
    }
  })();
// setInterval(()=> {
//   console.log('CatchStore---->', stateHookCache);
// }, 1000)
export type ExecuteConfig = { noCacheLoad?: boolean, retry?: number };

export type CommState<T, RP = void> = {
  readonly state: StateHookState;
  readonly refreshInterval?: number;
  readonly uuid: string;
  setData: (data: T) => void;
  readonly cacheStorage: CatchStorage;
  readonly setRefreshInterval: (refreshInterval?: number) => { readonly close: () => void };
  readonly setFactory: (factory: (args: RP) => Promise<T> | StateHookCache<T, RP>) => void;
  readonly setFactoryParameter: (factoryParameter: () => RP) => void;
  readonly lastSuccessData?: T;
  readonly lastErrorData?: any;
};

export type CommRefresh<T, RP = void> = {
  readonly refresh: (factory?: (args: RP) => Promise<T> | StateHookCache<T, RP>, config?: ExecuteConfig) => void;
  readonly mutate: (args: RP, config?: ExecuteConfig) => void;
  readonly mutateMaintain: (args: RP, config?: ExecuteConfig) => void;
  readonly refreshMaintain: (
    factory?: (args: RP) => Promise<T> | StateHookCache<T, RP>,
    config?: ExecuteConfig
  ) => void;
  readonly setFactoryAndRefresh: (
    factory: (args: RP) => Promise<T> | StateHookCache<T, RP>,
    config?: ExecuteConfig
  ) => void;
  readonly setFactoryAndRefreshMaintain: (
    factory: (args: RP) => Promise<T> | StateHookCache<T, RP>,
    config?: ExecuteConfig
  ) => void;
  readonly setFactoryParameterAndRefresh: (factoryParameter: () => RP, config?: ExecuteConfig) => void;
  readonly setFactoryParameterAndRefreshMaintain: (factoryParameter: () => RP, config?: ExecuteConfig) => void;
};

export type ReadyState<T, RP = void> = {
  readonly state: StateHookState.READY;
  readonly isReady: true;
  readonly isLoading: false;
  readonly isSuccess: false;
  readonly isError: false;
  readonly isFetchable: true;
  readonly isCached: boolean;
  readonly data: T;
} & CommState<T, RP> &
  CommRefresh<T, RP>;

export type LoadingState<T, RP = void> = {
  readonly state: StateHookState.LOADING;
  readonly isReady: false;
  readonly isLoading: true;
  readonly isSuccess: false;
  readonly isError: false;
  readonly isFetchable: false;
} & CommState<T, RP>;

export type ErrorState<T, RP = void> = {
  state: StateHookState.ERROR;
  readonly data: any;
  readonly isReady: false;
  readonly isLoading: false;
  readonly isSuccess: false;
  readonly isError: true;
  readonly isFetchable: true;
  readonly refresh: (factory?: (args: RP) => Promise<T>, config?: ExecuteConfig) => void;
} & CommState<T, RP> &
  CommRefresh<T, RP>;

export type SuccessState<T, RP = void> = {
  state: StateHookState.SUCCESS;
  readonly data: T;
  readonly isReady: false;
  readonly isLoading: false;
  readonly isSuccess: true;
  readonly isError: false;
  readonly isFetchable: true;
  readonly isCached: boolean;
  readonly refresh: (factory?: (args: RP) => Promise<T>, config?: ExecuteConfig) => void;
} & CommState<T, RP> &
  CommRefresh<T, RP>;

export type StateHook<T, RP = void> =
  | ReadyState<T, RP>
  | LoadingState<T, RP>
  | ErrorState<T, RP>
  | SuccessState<T, RP>;

export type SignalType = 'retry' | 'ready' | 'success' | 'error' | 'loading';

export interface StateHookCacheDataType {
}

usePromiseState.setCache = <K extends keyof StateHookCacheDataType | StateHookCacheKey>(
  key: K,
  data: { data: K extends keyof StateHookCacheDataType ? StateHookCacheDataType[K] : any; cacheTime: number }
) => {
  const keyString = JSON.stringify(key);
  const old = stateHookCache.get(keyString);
  if (old?.timer) {
    clearTimeout(old.timer);
  }
  stateHookCache.set(keyString, {data: data.data, timer: undefined, cacheTime: data.cacheTime});
  setTimeout(() => {
    stateHookCache.delete(keyString);
  }, data.cacheTime);
};

export function usePromiseState<T = unknown, RP = void>(
  config?: {
    factoryParams?: () => RP;
    factory?: (args: RP) => Promise<T> | StateHookCache<T, RP>;
    filter?: () => boolean;
    error?: (data: ErrorState<T, RP>) => void;
    success?: (data: SuccessState<T, RP>) => void;
    finish?: () => void;
    initialState?: (T | undefined) | ((config: { cacheStorage: CatchStorage }) => T | undefined | void);
    refreshInterval?: number;
    maintain?: boolean;
    executeConfig?: ExecuteConfig;
    manual?: boolean;
    signal?: (type: SignalType, data?: StateHook<T, RP>) => void;
  },
  deps?: DependencyList
): StateHook<T, RP> {
  let refreshInterval = React.useMemo(() => config?.refreshInterval, []);
  let timeout: any = React.useMemo(() => undefined, []);
  let factoryLocal: (args: RP) => Promise<T> | StateHookCache<T, RP> = React.useMemo(
    () => config?.factory ?? (() => Promise.resolve(config?.initialState as T)),
    deps ?? []
  );
  let factoryParameterLocal: () => RP = React.useMemo(() => config?.factoryParams ?? (() => undefined as unknown as RP), deps ?? []);
  const execute = React.useCallback(
    async (
      factoryDatas: { factory: (args: RP) => Promise<T> | StateHookCache<T, RP>; factoryParameterLocal?: () => RP },
      maintain: boolean = false,
      executeConfig?: ExecuteConfig
    ) => {
      if (config?.filter?.() === false) return;
      const factoryData = factoryDatas.factory(
        factoryDatas.factoryParameterLocal ? factoryDatas.factoryParameterLocal() : factoryParameterLocal()
      );
      // console.log('execu---', factoryData, factoryDatas, maintain, executeConfig);
      if (!factoryData) return;
      // 캐쉬 처리부분 캐쉬 처리 원하면
      if (!(factoryData instanceof Promise)) {
        const cacheData = stateHookCache.get(factoryData.key);
        // console.log('cacheData', cacheData);
        // 캐쉬 스토리지에 없으면, 캐쉬로딩 안한다면
        if (executeConfig?.noCacheLoad === true || !cacheData) {
          const data = (await execute(
            {
              factory: factoryData.factory,
              factoryParameterLocal: factoryDatas.factoryParameterLocal ?? factoryParameterLocal
            },
            maintain,
            executeConfig
          )) as SuccessState<T> | ErrorState<T>;

          // console.log('@@@@data', data);
          if (data?.isSuccess) {
            if (
              typeof factoryData.cacheCleanup === 'function' ? factoryData.cacheCleanup() : factoryData.cacheCleanup
            ) {
              stateHookCache.delete(factoryData.key);
            }
            const timer = setTimeout(
              () => {
                stateHookCache.delete(factoryData.key);
              },
              typeof factoryData.cacheTime === 'function' ? factoryData.cacheTime() : factoryData.cacheTime
            );
            stateHookCache.set(factoryData.key, {
              data: data.data,
              cacheTime:
                typeof factoryData.cacheTime === 'function' ? factoryData.cacheTime() : factoryData.cacheTime,
              timer: timer
            });
          }
          return data;
        } else {
          // 캐쉬 스토리지에 있으면
          let newResponseData = cacheData.data;
          if (
            typeof factoryData.cacheCleanup === 'function' ? factoryData.cacheCleanup() : factoryData.cacheCleanup
          ) {
            clearTimeout(cacheData.timer);
            const data = (await execute(
              {
                factory: factoryData.factory,
                factoryParameterLocal: factoryDatas.factoryParameterLocal ?? factoryParameterLocal
              },
              maintain,
              executeConfig
            )) as SuccessState<T> | ErrorState<T>;
            if (data?.isSuccess) {
              newResponseData = data.data;
              // stateHookCache.set(key, { data: data.data, cacheTime: factoryData.cacheTime, timer: timer });
            }
            const timer = setTimeout(
              () => {
                stateHookCache.delete(factoryData.key);
              },
              typeof factoryData.cacheTime === 'function' ? factoryData.cacheTime() : factoryData.cacheTime
            );
            stateHookCache.set(factoryData.key, {
              data: newResponseData,
              cacheTime:
                typeof factoryData.cacheTime === 'function' ? factoryData.cacheTime() : factoryData.cacheTime,
              timer: timer
            });
          }
          return await new Promise((resolve, reject) => {
            const newData: SuccessState<T, RP> = {
              state: StateHookState.SUCCESS,
              uuid: RandomUtils.uuid(),
              setData: (data: T) => {
                setData(prev => ({...prev, lastSuccessData: prev.isSuccess ? prev.data : prev.lastSuccessData, lastErrorData: prev.isError ? prev.data : prev.lastErrorData, data: data, uuid: RandomUtils.uuid()}));
              },
              cacheStorage: stateHookCache,
              data: newResponseData as T,
              refreshInterval: refreshInterval,
              setRefreshInterval(dataMillisecond: number | undefined) {
                refreshInterval = dataMillisecond;
                clearTimeout(timeout);
                if (dataMillisecond) {
                  newData.refresh();
                }
                return {close: () => clearTimeout(timeout)};
              },
              isReady: false,
              isLoading: false,
              isSuccess: true,
              isError: false,
              isFetchable: true,
              isCached: true,
              setFactory: (factory: (args: RP) => Promise<T> | StateHookCache<T, RP>) => {
                factoryLocal = factory;
              },
              setFactoryParameter: (factoryParameter: () => RP) => {
                factoryParameterLocal = factoryParameter;
              },
              setFactoryAndRefresh(
                factory: (args: RP) => Promise<T> | StateHookCache<T, RP>,
                config?: ExecuteConfig
              ) {
                newData.setFactory(factory);
                newData.refresh(undefined, config);
              },
              setFactoryAndRefreshMaintain(
                factory: (args: RP) => Promise<T> | StateHookCache<T, RP>,
                config?: ExecuteConfig
              ) {
                newData.setFactory(factory);
                newData.refreshMaintain(undefined, config);
              },
              setFactoryParameterAndRefresh(factoryParameter: () => RP, config?: ExecuteConfig) {
                newData.setFactoryParameter(factoryParameter);
                newData.refresh(undefined, config);
              },
              setFactoryParameterAndRefreshMaintain(factoryParameter: () => RP, config?: ExecuteConfig) {
                newData.setFactoryParameter(factoryParameter);
                newData.refreshMaintain(undefined, config);
              },
              refresh: (factory?: (args: RP) => Promise<T> | StateHookCache<T, RP>, config?: ExecuteConfig) => {
                clearTimeout(timeout);
                execute({factory: factory ?? factoryLocal}, false, config);
              },
              mutate: (args: RP, config?: ExecuteConfig) => {
                clearTimeout(timeout);
                execute({factory: factoryLocal, factoryParameterLocal: () => args}, false, config);
              },
              mutateMaintain: (args: RP, config?: ExecuteConfig) => {
                clearTimeout(timeout);
                execute({factory: factoryLocal, factoryParameterLocal: () => args}, true, config);
              },
              refreshMaintain: (
                factory?: (args: RP) => Promise<T> | StateHookCache<T, RP>,
                config?: ExecuteConfig
              ) => {
                clearTimeout(timeout);
                execute({factory: factory ?? factoryLocal}, true, config);
              }
            };
            setData(prev => {
              (newData as any).lastSuccessData = prev.isSuccess ? prev.data : prev.lastSuccessData;
              (newData as any).lastErrorData = prev.isError ? prev.data : prev.lastErrorData;
              config?.signal?.('success', newData);
              config?.success?.(newData);
              return newData
            });
            return resolve(newData);
          }).finally(() => {
            if (refreshInterval) {
              clearTimeout(timeout);
              timeout = setTimeout(() => {
                execute(
                  {factory: factoryLocal, factoryParameterLocal: factoryParameterLocal},
                  maintain,
                  executeConfig
                );
              }, refreshInterval);
            } else if (timeout) {
              clearTimeout(timeout);
            }
          });
        }
      }

      let lastData = data;
      if (maintain === false) {
        const newData: LoadingState<T, RP> = {
          state: StateHookState.LOADING,
          uuid: RandomUtils.uuid(),
          setData: (data: T) => {
            setData(prev => ({...prev, lastSuccessData: prev.isSuccess ? prev.data : prev.lastSuccessData, lastErrorData: prev.isError ? prev.data : prev.lastErrorData, data: data, uuid: RandomUtils.uuid()}));
          },
          cacheStorage: stateHookCache,
          refreshInterval: refreshInterval,
          setRefreshInterval(dataMillisecond: number | undefined) {
            refreshInterval = dataMillisecond;
            clearTimeout(timeout);
            return {close: () => clearTimeout(timeout)};
          },
          isReady: false,
          isLoading: true,
          isSuccess: false,
          isError: false,
          isFetchable: false,
          setFactory: (factory: (args: RP) => Promise<T> | StateHookCache<T, RP>) => {
            factoryLocal = factory;
          },
          setFactoryParameter: (factoryParameter: () => RP) => {
            factoryParameterLocal = factoryParameter;
          }
        };
        lastData = newData;
        setData(prev => {
          (newData as any).lastSuccessData = prev.isSuccess ? prev.data : prev.lastSuccessData;
          (newData as any).lastErrorData = prev.isError ? prev.data : prev.lastErrorData;
          config?.signal?.('loading', newData);
          return newData
        });
      }


      //////////
      const retry = executeConfig?.retry ?? 0;
      const retryFactoryData = retry > 0 ? new Promise<T>(async (resolve, reject) => {
        for (let i = retry; i > 0; i--) {
          const factory = i === retry ? factoryData : factoryDatas.factory(
            factoryDatas.factoryParameterLocal ? factoryDatas.factoryParameterLocal() : factoryParameterLocal()
          ) as Promise<T>;

          try {
            const data = await factory;
            resolve(data);
            break;
          } catch (e) {
            if (i === 1) {
              reject(e);
              return;
            }
            config?.signal?.('retry', lastData);
          }
        }
      }) : factoryData;
      return await retryFactoryData
        .then(it => {
          const newData: SuccessState<T, RP> = {
            state: StateHookState.SUCCESS,
            data: it,
            uuid: RandomUtils.uuid(),
            setData: (data: T) => {
              setData(prev => ({...prev, lastSuccessData: prev.isSuccess ? prev.data : prev.lastSuccessData, lastErrorData: prev.isError ? prev.data : prev.lastErrorData, data: data, uuid: RandomUtils.uuid()}));
            },
            cacheStorage: stateHookCache,
            refreshInterval: refreshInterval,
            setRefreshInterval(dataMillisecond: number | undefined) {
              refreshInterval = dataMillisecond;
              clearTimeout(timeout);
              if (dataMillisecond) {
                newData.refresh();
              }
              return {close: () => clearTimeout(timeout)};
            },
            isReady: false,
            isLoading: false,
            isSuccess: true,
            isError: false,
            isFetchable: true,
            isCached: false,
            setFactory: (factory: (args: RP) => Promise<T> | StateHookCache<T, RP>) => {
              factoryLocal = factory;
            },
            setFactoryParameter: (factoryParameter: () => RP) => {
              factoryParameterLocal = factoryParameter;
            },
            setFactoryAndRefresh(
              factory: (args: RP) => Promise<T> | StateHookCache<T, RP>,
              config?: ExecuteConfig
            ) {
              newData.setFactory(factory);
              newData.refresh(undefined, config);
            },
            setFactoryAndRefreshMaintain(
              factory: (args: RP) => Promise<T> | StateHookCache<T, RP>,
              config?: ExecuteConfig
            ) {
              newData.setFactory(factory);
              newData.refreshMaintain(undefined, config);
            },
            setFactoryParameterAndRefresh(factoryParameter: () => RP, config?: ExecuteConfig) {
              newData.setFactoryParameter(factoryParameter);
              newData.refresh(undefined, config);
            },
            setFactoryParameterAndRefreshMaintain(factoryParameter: () => RP, config?: ExecuteConfig) {
              newData.setFactoryParameter(factoryParameter);
              newData.refreshMaintain(undefined, config);
            },
            refresh: (factory?: (args: RP) => Promise<T> | StateHookCache<T, RP>, config?: ExecuteConfig) => {
              clearTimeout(timeout);
              execute({factory: factory ?? factoryLocal}, false, config);
            },
            mutate: (args: RP, config?: ExecuteConfig) => {
              clearTimeout(timeout);
              execute({factory: factoryLocal, factoryParameterLocal: () => args}, false, config);
            },
            mutateMaintain: (args: RP, config?: ExecuteConfig) => {
              clearTimeout(timeout);
              execute({factory: factoryLocal, factoryParameterLocal: () => args}, true, config);
            },
            refreshMaintain: (
              factory?: (args: RP) => Promise<T> | StateHookCache<T, RP>,
              config?: ExecuteConfig
            ) => {
              clearTimeout(timeout);
              execute({factory: factory ?? factoryLocal}, true, config);
            }
          };
          setData(prev => {
            (newData as any).lastSuccessData = prev.isSuccess ? prev.data : prev.lastSuccessData;
            (newData as any).lastErrorData = prev.isError ? prev.data : prev.lastErrorData;
            config?.signal?.('success', newData);
            config?.success?.(newData);
            return newData
          });
          return newData;
        })
        .catch(e => {
          const newData: ErrorState<T, RP> = {
            state: StateHookState.ERROR,
            data: e,
            cacheStorage: stateHookCache,
            uuid: RandomUtils.uuid(),
            setData: (data: T) => {
              setData(prev => ({...prev, data: data, uuid: RandomUtils.uuid()}));
            },
            refreshInterval: refreshInterval,
            setRefreshInterval(dataMillisecond: number | undefined) {
              refreshInterval = dataMillisecond;
              clearTimeout(timeout);
              if (dataMillisecond) {
                newData.refresh();
              }
              return {close: () => clearTimeout(timeout)};
            },
            isReady: false,
            isLoading: false,
            isSuccess: false,
            isError: true,
            isFetchable: true,
            setFactory: (factory: (args: RP) => Promise<T> | StateHookCache<T, RP>) => {
              factoryLocal = factory;
            },
            setFactoryParameter: (factoryParameter: () => RP) => {
              factoryParameterLocal = factoryParameter;
            },
            setFactoryAndRefresh(
              factory: (args: RP) => Promise<T> | StateHookCache<T, RP>,
              config?: ExecuteConfig
            ) {
              newData.setFactory(factory);
              newData.refresh(undefined, config);
            },
            setFactoryAndRefreshMaintain(
              factory: (args: RP) => Promise<T> | StateHookCache<T, RP>,
              config?: ExecuteConfig
            ) {
              newData.setFactory(factory);
              newData.refreshMaintain(undefined, config);
            },
            setFactoryParameterAndRefresh(factoryParameter: () => RP, config?: ExecuteConfig) {
              newData.setFactoryParameter(factoryParameter);
              newData.refresh(undefined, config);
            },
            setFactoryParameterAndRefreshMaintain(factoryParameter: () => RP, config?: ExecuteConfig) {
              newData.setFactoryParameter(factoryParameter);
              newData.refreshMaintain(undefined, config);
            },
            refresh: (factory?: (args: RP) => Promise<T> | StateHookCache<T, RP>, config?: ExecuteConfig) => {
              clearTimeout(timeout);
              execute({factory: factory ?? factoryLocal}, false, config);
            },
            mutate: (args: RP, config?: ExecuteConfig) => {
              clearTimeout(timeout);
              execute({factory: factoryLocal, factoryParameterLocal: () => args}, false, config);
            },
            mutateMaintain: (args: RP, config?: ExecuteConfig) => {
              clearTimeout(timeout);
              execute({factory: factoryLocal, factoryParameterLocal: () => args}, true, config);
            },
            refreshMaintain: (
              factory?: (args: RP) => Promise<T> | StateHookCache<T, RP>,
              config?: ExecuteConfig
            ) => {
              clearTimeout(timeout);
              execute({factory: factory ?? factoryLocal}, true, config);
            }
          };
          setData(prev => {
            (newData as any).lastSuccessData = prev.isSuccess ? prev.data : prev.lastSuccessData;
            (newData as any).lastErrorData = prev.isError ? prev.data : prev.lastErrorData;
            config?.signal?.('error', newData);
            config?.error?.(newData);
            return newData;
          });
          return newData;
        })
        .finally(() => {
          config?.finish?.();
          if (refreshInterval) {
            timeout = setTimeout(() => {
              execute(
                {factory: factoryLocal, factoryParameterLocal: factoryParameterLocal},
                maintain,
                executeConfig
              );
            }, refreshInterval);
          } else if (timeout) {
            clearTimeout(timeout);
          }
        });
    },
    deps ?? []
  );

  const [data, setData] = React.useState<StateHook<T, RP>>(() => {
    const data =
      typeof config?.initialState === 'function'
        ? (config.initialState as Function)({cacheStorage: stateHookCache})
        : config?.initialState;

    const state = data ? StateHookState.SUCCESS : StateHookState.READY;
    // @ts-ignore
    const newData: ReadyState<T, RP> | SuccessState<T, RP> = {
      state: state,
      uuid: RandomUtils.uuid(),
      setData: (data: T) => {
        setData(prev => ({...prev, lastSuccessData: prev.isSuccess ? prev.data : undefined, lastErrorData: prev.isError ? prev.data : prev.lastErrorData, data: data, uuid: RandomUtils.uuid()}));
      },
      cacheStorage: stateHookCache,
      refreshInterval: refreshInterval,
      setRefreshInterval(dataMillisecond: number | undefined) {
        refreshInterval = dataMillisecond;
        clearTimeout(timeout);
        if (dataMillisecond) {
          newData.refresh();
        }
        return {close: () => clearTimeout(timeout)};
      },
      isReady: state === StateHookState.READY,
      isLoading: false,
      isSuccess: state === StateHookState.SUCCESS,
      isError: false,
      isFetchable: true,
      isCached: false,
      setFactory: (factory: (args: RP) => Promise<T> | StateHookCache<T, RP>) => {
        factoryLocal = factory;
      },
      setFactoryParameter: (factoryParameter: () => RP) => {
        factoryParameterLocal = factoryParameter;
      },
      refresh: (factory?: (args: RP) => Promise<T> | StateHookCache<T, RP>, config?: ExecuteConfig) => {
        clearTimeout(timeout);
        execute({factory: factory ?? factoryLocal}, false, config);
      },
      mutate: (args: RP, config?: ExecuteConfig) => {
        clearTimeout(timeout);
        execute({factory: factoryLocal, factoryParameterLocal: () => args}, false, config);
      },
      mutateMaintain: (args: RP, config?: ExecuteConfig) => {
        clearTimeout(timeout);
        execute({factory: factoryLocal, factoryParameterLocal: () => args}, true, config);
      },
      refreshMaintain: (factory?: (args: RP) => Promise<T> | StateHookCache<T, RP>, config?: ExecuteConfig) => {
        clearTimeout(timeout);
        execute({factory: factory ?? factoryLocal}, true, config);
      },
      setFactoryAndRefreshMaintain(
        factory: (args: RP) => Promise<T> | StateHookCache<T, RP>,
        config?: ExecuteConfig
      ) {
        newData.setFactory(factory);
        newData.refreshMaintain(undefined, config);
      },
      setFactoryParameterAndRefresh(factoryParameter: () => RP, config?: ExecuteConfig) {
        newData.setFactoryParameter(factoryParameter);
        newData.refresh(undefined, config);
      },
      setFactoryParameterAndRefreshMaintain(factoryParameter: () => RP, config?: ExecuteConfig) {
        newData.setFactoryParameter(factoryParameter);
        newData.refreshMaintain(undefined, config);
      },
      setFactoryAndRefresh(factory: (args: RP) => Promise<T> | StateHookCache<T, RP>, config?: ExecuteConfig) {
        newData.setFactory(factory);
        newData.refresh(undefined, config);
      },
      data: data
    };
    return newData;
  });
  React.useEffect(() => {
    if (factoryLocal && !config?.manual) {
      execute(
        {factory: factoryLocal, factoryParameterLocal: factoryParameterLocal},
        config?.maintain,
        config?.executeConfig
      );
    }
    return () => {
      clearTimeout(timeout);
      refreshInterval = undefined;
    };
  }, deps ?? []);

  config?.signal?.('ready', data);
  return data;
}

export default usePromiseState;