import { FilterFalsy, FilterNullish, Mutable } from '../types/types';
import { ValidUtils } from '../valid/ValidUtils';
import React from 'react';

export const useNotNullish = <R, T extends unknown>(
  callBack: (data: FilterNullish<Mutable<T>>) => R,
  detectData: T,
  initialState?: R | (() => R)
) => {
  const [data, setData] = React.useState<R | undefined>(initialState);
  const detect = Array.isArray(detectData) ? detectData : [detectData];
  React.useEffect(() => {
    if (ValidUtils.isNullishFiltered<T>(detectData)) {
      const r = callBack(detectData);
      setData(r);
    }
  }, detect);
  return data;
};
export default useNotNullish;