import { Observable } from './Observable';

export interface Store<T> {
  observable: Observable<T>;
  publish?(data: T): void | Promise<void>;
  transaction?<R>(data: T, transaction: (data: T, oldData?: T) => Promise<R> | R): Promise<R>;
  getValue?(): T;
}
