import { ReactType } from '../types/types';
import { DependencyList } from 'react';
import { FilterFalsy, FilterNullish, Mutable } from '../types/types';
import { ValidUtils } from '../valid/ValidUtils';
import { Observable, Subscription } from '../message';
export function useObservable<T = undefined>(React: ReactType, fFactory: () => Observable<T>): T | undefined;
export function useObservable<T>(
  React: ReactType,
  factory: () => Observable<T>,
  config: {
    initialState: T | (() => T);
    originInstance?: true;
    error?: (e: any) => void;
    complete?: () => void;
    deps?: DependencyList;
  }
): T;
export function useObservable<T>(
  React: ReactType,
  factory: () => Observable<T>,
  config?: {
    initialState: T | (() => T);
    originInstance?: true;
    error?: (e: any) => void;
    complete?: () => void;
    deps?: DependencyList;
  }
): T;
export function useObservable<T>(
  React: ReactType,
  factory: () => Observable<T>,
  config?: {
    initialState?: T | (() => T);
    originInstance?: true;
    error?: (e: any) => void;
    complete?: () => void;
    deps?: DependencyList;
  }
) {
  const [data, setData] = React.useState(config?.initialState);

  React.useEffect(() => {
    const subscription = factory().subscribe(
      e => {
        if (config?.originInstance || typeof e !== 'object' || !e) return setData(e);

        if (Array.isArray(e)) return setData([...e] as any);
        else return setData({ ...e });
      },
      config?.error,
      config?.complete
    );
    return () => {
      subscription.unsubscribe();
    };
  }, config?.deps ?? []);

  return data;
}
  export default useObservable;