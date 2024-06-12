export interface Support<T = any, S = boolean, R = any> {
  execute?(data: T): Promise<R>;

  isSupport(data: T): Promise<S>;
}
