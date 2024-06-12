export interface SupportAround<T = any, S = boolean, R = any> {
  after?(data: T): Promise<R>;
  before?(data: T): Promise<R>;
  isSupport(data: T): Promise<S>;
}
