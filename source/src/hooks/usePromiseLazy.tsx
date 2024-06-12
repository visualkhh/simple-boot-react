import React from "react";

export type LazyPromiseHook<T> = {
  value?: T;
  fetch: (promise: Promise<T>) => Promise<T>;
};

export function usePromiseLazy<T = undefined>(): LazyPromiseHook<T>;
export function usePromiseLazy<T>(initialState: T | (() => T)): LazyPromiseHook<T>;
export function usePromiseLazy<T>(initialState?: T | (() => T)) {
  const [data, setData] = React.useState(initialState);
  const lazyPromiseHook: LazyPromiseHook<T> = {
    value: data,
    fetch: (promise: Promise<T>) => {
      return promise.then(it => {
        setData(it);
        return it;
      });
    }
  };
  return lazyPromiseHook;
}

export default usePromiseLazy;