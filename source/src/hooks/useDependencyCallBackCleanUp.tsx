import { DependencyList } from 'react'
import React from 'react';
export const useDependencyCallBackCleanUp = <T extends DependencyList>(callback: (deps?: T) => () => void, deps?: T) => {
  React.useEffect(() => {
    const r = callback(deps);
    return () => {
      r?.();
    };
  }, deps);
}
export default useDependencyCallBackCleanUp;