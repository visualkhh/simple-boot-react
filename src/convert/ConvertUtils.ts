import { Dictionary, FilterTuple, GroupBy } from '../types/types';
import { ValidUtils } from '../valid/ValidUtils';

export namespace ConvertUtils {
  export function objToGetURL(obj: any): string {
    return Object.keys(obj).reduce((prev, key, i) => `${prev}${i !== 0 ? '&' : ''}${key}=${obj[key]}`, '');
  }

  export function entriesToObj<T>(e: IterableIterator<[string, any]>): T {
    const r = {} as any;
    Array.from(e).reduce((o: any, [key, value]) => {
      o[key] = value;
      return o;
    }, r);
    return r as T;
  }
  export function mapToJson(map: Map<string, any>): string {
    return JSON.stringify(ConvertUtils.entriesToObj(map.entries()));
  }

  export function jsonToMap(jsonStr: any): Map<string, string> {
    return new Map(JSON.parse(jsonStr));
  }

  export function objToStrMap(obj: any): Map<string, string> {
    const strMap = new Map();
    for (const k of Object.keys(obj)) {
      strMap.set(k, obj[k]);
    }
    return strMap;
  }

  export function jsonToStrMap(jsonStr: string) {
    return objToStrMap(JSON.parse(jsonStr));
  }

  export function base64Encode(str: string) {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return String.fromCharCode('0x' + p1);
      })
    );
  }

  export function base64Decode(base64: string) {
    return decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
  }

  export function strToObject(message: string): any {
    return JSON.parse(message);
  }

  export function objToJson(obj: any): string {
    return JSON.stringify(obj);
  }

  export function objToMap(obj: any): Map<string, any> {
    const mp = new Map<string, any>();
    Object.keys(obj).forEach(k => {
      mp.set(k, obj[k]);
    });
    return mp;
  }

  export function mapToObj(map: Map<string, any>): any {
    const obj = {} as any;
    map.forEach((v, k) => {
      obj[k] = v;
    });
    return obj;
  }

  export function toObject(obj: any): any {
    if (ValidUtils.isMap(obj)) {
      const map = obj as Map<string, any>;
      obj = mapToObj(map);
    }
    if (ValidUtils.isArray(obj)) {
      const arr = obj as any[];
      for (let i = 0; i < arr.length; i++) {
        arr[i] = toObject(arr[i]);
      }
    }

    if (ValidUtils.isObject(obj)) {
      for (const property in obj) {
        obj[property] = toObject(obj[property]);
      }
    }

    return obj;
  }

  export function urlSearchParamsToObject<T>(params: URLSearchParams | string): T {
    if (typeof params === 'string') {
      params = new URLSearchParams(params);
    }

    const obj: any = {};
    for (const [key, value] of Array.from(params.entries())) {
      obj[key] = value;
    }
    return obj;
  }

  export function iteratorToArray<T>(it: any): T[] {
    return Array.from(it) as T[];
  }

  export function toJson(obj: any): string {
    const at = toObject(obj);
    return JSON.stringify(at);
  }

  export function concatenateToAttribute(object_o: any) {
    return concatenateToString(object_o, '=', ' ', "'");
  }

  export function concatenateToParameter(object_o: any) {
    return concatenateToString(object_o, '=', '&', '');
  }

  export function concatenateToString(object_o: any, unionString_s = '=', spilString_s = ' ', pairString_s = '') {
    const results = [];
    for (const property in object_o) {
      const value = object_o[property];
      if (value) {
        results.push(property.toString() + unionString_s + pairString_s + value + pairString_s);
      }
    }

    return results.join(spilString_s);
  }

  export function specialCharsToEscape(data: string): string {
    return data.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  export function deleteEmpty<T = any>(obj: T, ref?: boolean) {
    return keysFilter(
      obj,
      (key, value) => {
        return !ValidUtils.isEmpty(value);
      },
      ref
    );
  }

  export function keysFilter<T = any>(obj: T, callback: (key: string, value: any, obj: T) => boolean, ref?: boolean) {
    const nObj = ref ? obj : ({ ...obj } as T);
    keysForEach(nObj, (key, value, obj) => {
      if (!callback(key, value, obj)) {
        delete (obj as any)[key];
      }
    });
    return nObj;
  }

  export function toFlatArray<T = any>(obj?: T | T[]): T[] {
    if (obj === undefined) {
      return [];
    }
    if (Array.isArray(obj)) {
      return obj.reduce<T[]>((prev, curr) => {
        return prev.concat(toFlatArray<T>(curr));
      }, []);
    }
    return [obj];
  }
  export function toURLSearchParams(obj: Record<string, string | string[] | undefined>) {
    const urlSearchParams = new URLSearchParams();
    Object.entries(obj).forEach(([k, v]) => {
      if (Array.isArray(v)) {
        v.forEach(it => {
          urlSearchParams.append(k, it);
        });
      } else if (v !== undefined) {
        urlSearchParams.append(k, v);
      }
    });
    return urlSearchParams;
  }

  export function keysForEach<T = any>(obj: T, callback: (key: string, value: any, obj: T) => void) {
    Object.keys(obj as any).forEach((key: string) => {
      callback(key, (obj as any)[key], obj);
    });
  }

  export function groupBy<T extends Dictionary, K extends keyof T>(arr: T[], key: K): GroupBy<T, K> {
    return arr.reduce((rv: any, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  export const nullIfRejected = <T>(result: PromiseSettledResult<T>) => {
    if (result.status === 'rejected') return null;
    return result.value;
  };
  export const nullIfRejectedWith = <T, U>(result: PromiseSettledResult<T>, mapper: (it: T) => U) => {
    if (result.status === 'rejected') return null;
    return mapper(result.value);
  };

  export const groupBySelector = <T, K extends string | number>(
    arr: T[],
    selector: (item: T) => K
  ): { [key in K]: T[] } =>
    arr.reduce((rv: any, x) => {
      const key = selector(x);
      (rv[key] = rv[key] || []).push(x);
      return rv;
    }, {});

  export const partialRecordToMap = <K extends string | number, V>(record: Partial<Record<K, V>>): Map<K, V> => {
    return new Map(Object.entries(record) as [K, V][]);
  };

 export const deleteNullish = <T = any>(obj: T): T  => {
    const newObj = { ...obj } as any;
    Object.keys(newObj).forEach(key => {
      if (newObj[key] === undefined || newObj[key] === null) {
        delete newObj[key];
      }
    });
    return newObj;
  }


export const formDataSetValue = (form: HTMLFormElement, data: Record<string, any>, beforeReset = false) => {
    if (beforeReset) {
      form.reset();
    }
    Object.entries(data).forEach(([k, v]) => {
      form.querySelectorAll(`[name="${k}"]`)?.forEach(it => {
        if ('value' in it) {
          // console.log('-------', it, v);
          // @ts-ignore
          it.value = v;
        }
      });
    });
  }


export const formDataToFormDataEntryValueObj = <T = { [key: string]: FormDataEntryValue | FormDataEntryValue[] }>  (
    data: FormData | HTMLFormElement
): T  => {
    if (data instanceof HTMLFormElement) {
      data = new FormData(data);
    }
    const obj: any = {};
    data.forEach((value, key) => {
      if (Array.isArray(obj[key])) {
        obj[key].push(value);
      } else if (obj[key] !== undefined || !isNaN(obj[key])) {
        obj[key] = [obj[key], value];
      } else {
        obj[key] = value;
      }
    });
    return obj;
  }
export const copyObject = <T extends Record<string, any>>(obj: T, update: Partial<T> = {}): T => {
    return { ...obj, ...update };
  }

export const  copyArrayWithAddition = <T extends unknown[]>(arr: FilterTuple<T>, update?: T): T => {
    return [...arr, ...(update || [])] as T;
  }
}
