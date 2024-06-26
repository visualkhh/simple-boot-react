import { FilterFalsy, Mutable } from '../types/types';
import { ValidUtils } from '../valid/ValidUtils';
import React from 'react';
export const useNotFalsy = <R, T extends unknown>(
  callBack: (data: FilterFalsy<Mutable<T>>) => R,
  detectData: T,
  initialState?: R | (() => R)
) => {
  const [data, setData] = React.useState<R | undefined>(initialState);
  const detect = Array.isArray(detectData) ? detectData : [detectData];
  React.useEffect(() => {
    if (ValidUtils.isFalsyFiltered<T>(detectData)) {
      const r = callBack(detectData);
      setData(r);
    }
  }, detect);
  return data;
};
export default useNotFalsy;