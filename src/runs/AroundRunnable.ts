export interface AroundRunnable<R = any, T = any, AR = any, BR = any, SR = any> {
  after?(data: T): Promise<AR>;
  before?(data: T): Promise<BR>;
  run(...params: any[]): R;
  stop?(): SR;
}
