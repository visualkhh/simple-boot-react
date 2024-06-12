import React from 'react';
import { FilterNullish, Mutable } from '../types/types';
import { ValidUtils } from '../valid/ValidUtils';

export const usePromiseNotNullish = <S, T extends unknown>(
  callback: (data: FilterNullish<Mutable<T>>) => Promise<S> | React.SetStateAction<S | undefined>,
  data: T,
  initialState?: S | (() => S)
) => {
  const [dataState, setDataState] = React.useState(initialState);
  const detect = Array.isArray(data) ? data : [data];

  React.useEffect(() => {
    if (ValidUtils.isNullishFiltered<T>(data)) {
      const result = callback(data);
      if (result instanceof Promise) {
        result.then(it => setDataState(it));
      } else {
        setDataState(result);
      }
    }
  }, detect);
  return dataState;
};
export default usePromiseNotNullish;