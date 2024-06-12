import { DependencyList } from 'react';
import React from 'react';
export function usePromise<T = undefined>(
  factory: () => Promise<T>,
  config: {
    initialState?: T;
    catch?: (e: any) => void;
    finally?: () => void;
    destroy?: (data?: T) => void;
    deps?: DependencyList;
  }
): T | undefined;
export function usePromise<T>(
  factory: () => Promise<T>,
  config: {
    initialState: T | (() => T);
    catch?: (e: any) => void;
    finally?: () => void;
    destroy?: (data?: T) => void;
    deps?: DependencyList;
  }
): T;
export function usePromise<T>(
  factory: () => Promise<T>,
  config?: {
    initialState: T | (() => T);
    catch?: (e: any) => void;
    finally?: () => void;
    destroy?: (data?: T) => void;
    deps?: DependencyList;
  }
): T;
export function usePromise<T>(
  factory: () => Promise<T>,
  config?: {
    initialState?: T | (() => T);
    catch?: (e: any) => void;
    finally?: () => void;
    destroy?: (data?: T) => void;
    deps?: DependencyList;
  }
) {
  let [data, setData] = React.useState(config?.initialState);
  React.useEffect(() => {
    factory()
      .then(it => {
        data = it as any;
        setData(() => {
          return it;
        });
        return it;
      })
      .catch(e => {
        config?.catch?.(e);
        return e;
      })
      .finally(() => config?.finally?.());

    return () => {
      config?.destroy?.(data);
    };
  }, config?.deps ?? []);
  return data;
}
export default usePromise;