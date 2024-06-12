import { RunnableLoader } from './RunnableLoader';
import { Observable } from '../message/Observable';

export type StoreLoadedState<T> = {
  state: 'loaded';
  data: T;
};
export type StoreErrorState = {
  state: 'error';
  data: any;
};

export type StoreRunnableState<T> =
  | {
      state: 'ready' | 'loading' | 'unloaded';
    }
  | StoreLoadedState<T>
  | StoreErrorState
  | {
      state: 'unloaded';
    };

export abstract class StoreRunnableLoader<T> extends RunnableLoader<T> {
  public abstract observable: Observable<StoreRunnableState<T>>;
}
