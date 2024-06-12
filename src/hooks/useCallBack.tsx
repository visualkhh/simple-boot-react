import { DependencyList } from 'react'
import { ReactType } from '../types/types';
export const useCallBack = <T extends DependencyList>(React: ReactType, callback: (deps?: T) => () => void, deps?: T) => {
  React.useEffect(() => {
    const r = callback(deps);
    return () => {
      r?.();
    };
  }, deps);
}
  export default useCallBack;