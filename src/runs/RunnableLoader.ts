import { Runnable } from './Runnable';

export abstract class RunnableLoader<T> implements Runnable<Promise<T>> {
  protected loaded?: T;
  public run(...params: any[]): Promise<T> {
    return this.load()
      .then(it => {
        this.loaded = it;
        this.completed(this.loaded);
        return it;
      })
      .catch(e => {
        this.error(e);
        throw e;
      });
  }

  stop() {
    this.unload(this.loaded);
  }

  protected abstract load(): Promise<T>;

  protected abstract unload(installed?: T): Promise<void>;

  protected abstract completed(installed: T): Promise<void>;

  protected abstract error(e: any): Promise<void>;
}
