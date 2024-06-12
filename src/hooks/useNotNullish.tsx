import { ReactType } from '../types/types';
import { FilterFalsy, FilterNullish, Mutable } from '../types/types';
import { ValidUtils } from '../valid/ValidUtils';

export const useNotNullish = <T extends unknown>(
  React: ReactType,
  callBack: (data: FilterNullish<Mutable<T>>) => (() => void) | void,
  data: T
) => {
  const detect = Array.isArray(data) ? data : [data];
  React.useEffect(() => {
    if (ValidUtils.isNullishFiltered<T>(data)) {
      const r = callBack(data);
      return () => {
        r?.();
      };
    }
  }, detect);
};
  export default useNotNullish;