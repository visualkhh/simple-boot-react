import { Subscription } from './Subscription';

type res<T> = (data: T) => void;
type error = (e: any) => void;
type complete = () => void;
export type Observable<T> = {
  subscribe: (d: res<T>, e?: error, c?: complete) => Subscription;
};
