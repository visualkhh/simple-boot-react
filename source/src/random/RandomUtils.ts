import { ValidUtils } from '../valid/ValidUtils';

export class RandomUtils {
  static random(min?: number, max?: number) {
    if (ValidUtils.isNullOrUndefined(min)) {
      return Math.random();
    } else if (!ValidUtils.isNullOrUndefined(min) && ValidUtils.isNullOrUndefined(max)) {
      return Math.random() * (min || 0);
    } else {
      return Math.random() * ((max || 0) - (min || 0)) + (min || 0);
    }
  }

  static uuid(format: string = 'xxxx-xxxx-xxxx-xxxx'): string {
    return format.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  static uuid4(): string {
    // // return uuid of form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    let uuid = '';
    let ii;
    for (ii = 0; ii < 32; ii += 1) {
      switch (ii) {
        case 8:
        case 20:
          uuid += '-';
          uuid += ((Math.random() * 16) | 0).toString(16);
          break;
        case 12:
          uuid += '-';
          uuid += '4';
          break;
        case 16:
          uuid += '-';
          uuid += ((Math.random() * 4) | 8).toString(16);
          break;
        default:
          uuid += ((Math.random() * 16) | 0).toString(16);
      }
    }
    return uuid;
  }

  static getRandomColor(): string {
    const letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // (Math.random().toString(36)+'00000000000000000').slice(2, 10) + Date.now()
  static getRandomString(len: number): string {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let color = '';
    for (let i = 0; i < len; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }

  static getUniqueNumbers(max: number, length: number) {
    max = Math.max(max, 0);
    length = Math.max(Math.min(max, length), 0);
    const array: number[] = [];
    while (array.length < length) {
      const num = Math.floor(Math.random() * max);
      if (!array.includes(num)) array.push(num);
    }
    return array;
  }
}
