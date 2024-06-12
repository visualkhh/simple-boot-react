import { ReactType } from '../types/types';
export type LazyPromiseHook<T> = {
  value?: T;
  fetch: (promise: Promise<T>) => Promise<T>;
};

export function usePromiseLazy<T = undefined>(React: ReactType): LazyPromiseHook<T>;
export function usePromiseLazy<T>(React: ReactType, initialState: T | (() => T)): LazyPromiseHook<T>;
export function usePromiseLazy<T>(React: ReactType, initialState?: T | (() => T)) {
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