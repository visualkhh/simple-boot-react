import { FilterFalsy, Mutable } from '../types/types';
import { ValidUtils } from '../valid/ValidUtils';
import React from 'react';
export const useNotFalsy = <T extends unknown>(
  callBack: (data: FilterFalsy<Mutable<T>>) => (() => void) | void,
  data: T
) => {
  const detect = Array.isArray(data) ? data : [data];
  React.useEffect(() => {
    if (ValidUtils.isFalsyFiltered<T>(data)) {
      const r = callBack(data);
      return () => {
        r?.();
      };
    }
  }, detect);
};
export default useNotFalsy;