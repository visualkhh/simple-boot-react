import React from "react";

export type PromiseCleanUp = (() => void) | void | undefined;
export const usePromiseCleanUp = (factory: () => Promise<PromiseCleanUp>, deps?: React.DependencyList) => {
  let data:PromiseCleanUp = undefined;
  React.useEffect(() => {
    factory().then(it => {
      data = it;
    });

    return () => {
      data?.();
    };
  }, deps);
};

export default usePromiseCleanUp;
