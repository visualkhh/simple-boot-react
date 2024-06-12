import { Runnable } from './Runnable';

export abstract class AutoStartRunner implements Runnable {
  protected constructor() {
    this.run();
  }

  abstract run(...params: any[]): any;
}
