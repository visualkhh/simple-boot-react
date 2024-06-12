import { FilterFalsy, FilterNullish } from '../types/types';

export namespace ValidUtils {
  export const isEmpty = (object_o: any): boolean => {
    if (ValidUtils.isNullOrUndefined(object_o)) {
      return true;
    } else if (ValidUtils.isArray(object_o)) {
      return object_o.length === 0;
    } else if (ValidUtils.isString(object_o)) {
      return object_o.trim().length === 0;
    } else if (ValidUtils.isMap(object_o)) {
      return object_o.size === 0;
    } else if (ValidUtils.isObject(object_o)) {
      return Object.keys(object_o).length === 0;
    } else {
      return false;
    }
  };

  export const isNullOrUndefined = (data: any): data is null | undefined => {
    return data == null;
  };

  export const isNotNullUndefined = (data: any) => {
    return data !== null && data !== undefined;
  };

  export const isNull = (data: any): data is null => {
    return data === null;
  };

  export const isUndefined = (data: any): data is undefined => {
    return data === undefined;
  };

  export const isArray = <T = any>(data: any): data is Array<T> => {
    return Array.isArray(data);
  };

  export const isNumber = (data: any): data is number => {
    return typeof data === 'number';
  };

  export const isString = (data: any): data is string => {
    return typeof data === 'string';
  };

  export const isFunction = (data: any): boolean => {
    return typeof data === 'function';
  };

  export const isObject = (data: any): boolean => {
    return typeof data === 'object';
  };

  export const isSet = <T = any>(data: any): data is Set<T> => {
    return data instanceof Set;
  };
  export const isMap = <K = string | number, V = any>(data: any): data is Map<K, V> => {
    return data instanceof Map;
  };

  export const isNullishFiltered = <T>(value: unknown): value is FilterNullish<T> => {
    if (Array.isArray(value)) {
      return value.every(it => it !== undefined && it !== null);
    }
    return value !== undefined && value !== null;
  };

  export const isFalsyFiltered = <T>(value: unknown): value is FilterFalsy<T> => {
    if (Array.isArray(value)) {
      return value.every(it => {
        return it;
      });
    }
    return !!value;
  };

  /** 종성이 있는지 확인하는 함수 */
  export const lastConsonantLetter = (value: string): boolean => {
    const lastLetter = value.charCodeAt(value.length - 1);
    return (lastLetter - 0xac00) % 28 > 0;
  };

  export const inRange = (value: number, min: number, max: number) => {
    return min <= value && value <= max;
  };

  export const isBrowser = (callBack?: (win: Window) => void): boolean => {
    const boolean = typeof window !== 'undefined';
    if (boolean && callBack) {
      callBack(window);
    }
    return boolean;
  };

  export const hasParentWindow = (win: Window) => ValidUtils.isBrowser() && win.parent && win !== win.parent;

  //////////////
  /**
   *  SNS Inapp Browser Check
   *  카카오톡 / 네이버 / 페이스북 / 인스타그램 지원
   */
  export const isSocialNetworkServiceInappBrowser = (): boolean => {
    const userAgent = ValidUtils.isBrowser() ? window.navigator.userAgent.toLowerCase() : 'none';
    return /kakaotalk|naver|facebook|insta|FBAN|FBAV/.test(userAgent);
  };

  /**
   *  IOS Webview 접속인지 체크
   */
  export const isWkWebview = (): boolean =>
    ValidUtils.isBrowser() &&
    (window as any)['webkit'] != null &&
    (window as any)['webkit'].messageHandlers != null &&
    (window as any)['webkit'].messageHandlers['System'] != null;
  export function isiPhone(): boolean {
    return ValidUtils.isBrowser() && /iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase());
  }
  /**
   *  Android Webview 접속인지 체크
   */
  export const isAndroidWebview = (): boolean => {
    return ValidUtils.isBrowser() && (window as any)['System'] != null;
  };
}
