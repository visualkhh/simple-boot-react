import { ReactType } from '../types/types';
import { DependencyList } from 'react';
import { FilterFalsy, FilterNullish, Mutable } from '../types/types';
import { ValidUtils } from '../valid/ValidUtils';
import { Subscription } from '../message';

export const useObservableUnsubscribe = (React: ReactType, subscriptionFactory: () => Subscription, deps?: DependencyList) => {
  React.useEffect(() => {
    const subscription = subscriptionFactory();
    return () => {
      subscription.unsubscribe();
    };
  }, deps ?? []);
};
  export default useObservableUnsubscribe;