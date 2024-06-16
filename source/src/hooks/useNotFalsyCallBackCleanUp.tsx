import { FilterFalsy, Mutable } from '../types/types';
import { ValidUtils } from '../valid/ValidUtils';
import React from 'react';
export const useNotFalsyCallBackCleanUp = <R, T extends unknown>(
  callBack: (data: FilterFalsy<Mutable<T>>) => (() => void) | void,
  detectData: T
) => {
  const detect = Array.isArray(detectData) ? detectData : [detectData];
  React.useEffect(() => {
    if (ValidUtils.isFalsyFiltered<T>(detectData)) {
      const r = callBack(detectData);
      return () => {
        r?.();
      };
    }
  }, detect);
};
export default useNotFalsyCallBackCleanUp;