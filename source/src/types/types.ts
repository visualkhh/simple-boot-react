// import React from "react";
// import React from "react";
// export type ReactType = typeof React;
export type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type KeysWithValsOfType<T, V> = keyof { [P in keyof T as T[P] extends V ? P : never]: P };
export type PropType<T> = {
  [P in keyof T]: T[P];
};
export type ArrayElementType<T> = T extends (infer U)[] ? U : never;
export type PickMix<T, M, K extends keyof T> = {
  [P in K]: T[P] & M;
};
export type PickArrayElementMix<T, M, K extends keyof T> = {
  [P in K]: (ArrayElementType<T[P]> & M)[];
};
export type ChangeArrayElement<T, M> = T extends (infer U)[] ? M[] : never;
export type ChangeArrayElementMix<T, M> = T extends (infer U)[] ? (U & M)[] : never;
export type ChangePickArrayElementMix<T, M, K extends keyof T> = Omit<T, K> & PickArrayElementMix<T, M, K>;

export interface ConstructorType<T> {
  new (...args: any[]): T;
}
export type GenericClassDecorator<T> = (target: T) => void;
export type ReflectField = (
  target: Object | { constructor: ConstructorType<any>; [key: string]: Function },
  propertyKey: string | symbol
) => void;
export type ReflectMethod = (
  target: any | ConstructorType<any> | { constructor: ConstructorType<any>; [key: string]: Function },
  propertyKey: string,
  descriptor: PropertyDescriptor
) => any;
export type MethodParameter = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;

type Reverse<TupleType extends any[], ReversedTupleType extends any[] = []> = {
  0: ReversedTupleType;
  1: TupleType extends [infer Head, ...infer Tail] ? Reverse<Tail, [Head, ...ReversedTupleType]> : never;
}[TupleType extends [] ? 0 : 1];

//
type UnionToIntersection<U> = (U extends unknown ? (arg: U) => 0 : never) extends (arg: infer I) => 0 ? I : never;

/**
 * LastInUnion<1 | 2> = 2.
 */
type LastInUnion<U> = UnionToIntersection<U extends unknown ? (x: U) => 0 : never> extends (x: infer L) => 0
  ? L
  : never;

/**
 * UnionToTuple<1 | 2> = [1, 2].
 */
export type UnionToTuple<U, Last = LastInUnion<U>> = [U] extends [never]
  ? []
  : [...UnionToTuple<Exclude<U, Last>>, Last];

export type FilterUndefined<T extends unknown[]> = T extends []
  ? []
  : T extends [infer H, ...infer R]
  ? H extends undefined
    ? FilterUndefined<R>
    : [H, ...FilterUndefined<R>]
  : T;

export type FilterNever<T extends unknown[]> = T extends []
  ? []
  : T extends [infer H, ...infer R]
  ? H extends never
    ? FilterUndefined<R>
    : [H, ...FilterUndefined<R>]
  : T;

export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};
export type ExtractNotNullish<T> = T extends null | undefined ? never : T;
export type FilterNullish<T> = T extends [infer E, ...infer Rest]
  ? [ExtractNotNullish<E>, ...FilterNullish<Rest>]
  : T extends (infer E)[]
  ? ExtractNotNullish<E>[]
  : ExtractNotNullish<T>;

export type ExtractNotFalsy<T> = T extends false ? never : T;
export type FilterFalsy<T> = T extends [infer E, ...infer Rest]
  ? [ExtractNotFalsy<E>, ...FilterFalsy<Rest>]
  : T extends (infer E)[]
  ? ExtractNotFalsy<E>[]
  : ExtractNotFalsy<T>;

export type Dictionary<T = any> = Record<string | number, T>;
type GetKeys<T> = T extends unknown[]
  ? T extends [] // special case empty tuple => no keys
    ? never
    : '0' extends keyof T // any tuple with at least one element
    ? Exclude<keyof T, keyof []>
    : number // other array
  : keyof T; // not an array
export type Stringify<T> = T extends string | number ? `${T}` : never;
// export type FlattenObjectKeys<T extends Dictionary | any[]> = Stringify<GetKeys<T>> extends infer StringKey extends
//   | string
//   | number
//   ? [StringKey] extends [never]
//     ? never
//     : StringKey extends keyof T
//     ? T[StringKey] extends Dictionary | any[]
//       ?
//           | StringKey
//           | `${StringKey}.${FlattenObjectKeys<T[StringKey]>}`
//           | `${StringKey}[${keyof T[StringKey] & number}]`
//           | `${StringKey}[${keyof T[StringKey] & number}].${FlattenObjectKeys<T[StringKey][number]>}`
//       : StringKey
//     : never
//   : never;

type GetType<T, K> = K extends keyof T ? T[K] : K extends `${number}` ? (T extends any[] ? T[number] : never) : never;
// export type FlattenObjectType<T, Path = Stringify<keyof T>> = Stringify<keyof T> extends infer StringKey extends
//   | string
//   | number
//   ? [StringKey] extends [never]
//     ? never
//     : Path extends `${infer FirstKey}[${infer Index}].${infer Rest}`
//     ? FlattenObjectType<GetType<GetType<T, FirstKey>, Index>, Rest>
//     : Path extends `${infer FirstKey}.${infer Rest}`
//     ? FlattenObjectType<GetType<T, FirstKey>, Rest>
//     : Path extends `${infer FirstKey}[${infer Rest}]`
//     ? FlattenObjectType<GetType<T, FirstKey>, Rest>
//     : GetType<T, Path>
//   : never;

// export type FlattenObject<T extends Dictionary> = {
//   [FlattenKey in FlattenObjectKeys<T>]: FlattenObjectType<T, FlattenKey>;
// };

export type FilterTuple<T extends any[]> = '0' extends keyof T ? never : T;

export type MaybeArray<T> = T | T[];
export type With<T extends MaybeArray<Dictionary>, V extends Dictionary> = T extends (infer U)[] ? Array<U & V> : T & V;

export type Nullable<T> = T | null;
export type Nullish<T> = Nullable<T> | undefined;
export type NullableObject<T> = {
  [P in keyof T]: Nullable<T[P]>;
};
export type NullableProperty<T, K extends keyof T> = {
  [P in K]: Nullable<T[P]>;
};
export type NonNullable<T> = T extends null | undefined ? never : T;
export type NonNullableObject<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};
export type NonNullableProperty<T, K extends keyof T> = {
  [P in K]-?: NonNullable<T[P]>;
};

export type GroupBy<T extends Dictionary, K extends keyof T> = {
  [P in T[K]]: T[];
};

export type InferPromise<T> = T extends Promise<infer U> ? U : never;


export interface ConstructorType<T> {
  new (...args: any[]): T;
}
