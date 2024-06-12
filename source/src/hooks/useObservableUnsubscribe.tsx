import { DependencyList } from 'react';
import { Subscription } from '../message';
import React from 'react';

export const useObservableUnsubscribe = (subscriptionFactory: () => Subscription, deps?: DependencyList) => {
  React.useEffect(() => {
    const subscription = subscriptionFactory();
    return () => {
      subscription.unsubscribe();
    };
  }, deps ?? []);
};
export default useObservableUnsubscribe;