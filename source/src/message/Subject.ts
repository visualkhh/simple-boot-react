export type Subject<T> = { next: (data: T) => void; value?: T };
