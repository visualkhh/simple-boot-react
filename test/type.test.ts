// // export type StateConfig = {update?: (prev: any, current: any) => void}
// // export type StateConfig<T = any> = {update?: Exclude<keyof T, 'boot'|'beforeRender'|'beforeComponentDidMount'|'beforeComponentDidUpdate'|'beforeShouldComponentUpdate'|'beforeComponentWillUnmount'>}
// import {SimComponent} from '../src/components/SimComponent';
// import {Component} from 'react';
//
// type aatt2 = keyof SimComponent;
// type aatt21 = typeof SimComponent;
// type aatt212 = Extract<typeof SimComponent, 'a' | 'b'>;
// type aatt = keyof typeof SimComponent;
// type aa = Extract<SimComponent, Function>;
// // https://stackoverflow.com/questions/59219954/can-you-extract-the-signature-of-all-the-methods-inside-a-class
// // type ReturnedActions<T> = {
// //         [P in  Exclude<Extract<T, Function>]: T[P] extends (...a: any) => infer R ? {
// //                 type: P,
// //                 payload: R
// //         } : never
// //         // [P in keyof T]: T[P] extends (...a: any) => infer R ? {
// //         //         type: P,
// //         //         payload: R
// //         // } : never
// // }[keyof T]
// // type ReturnedActions<T> = {
// //         [P in keyof T]: T[P] extends (...a: any) => infer R ? {
// //                 type: P,
// //                 payload: R
// //         } : never
// // }[keyof T]
// // const z2: ReturnedActions<SimComponent> = undefined;
// // z2.
// // type F = {
// //     [P in keyof SimComponent]: SimComponent[P] extends Function ? SimComponent[P] : never
// // }
// // type za = keyof F;
// // type aat2t21 = typeof SimComponent.prototype;
// // type ss = Extract<SimComponent[keyof SimComponent], Function>
// // type ff = {
// //     [P in keyof SimComponent]: string
// // }
// // definition type SimComponent class in only Function type
// // const aa = SimComponent.prototype;
// // type TypeOfClassMethod<T, M extends keyof T> = T[M] extends Function ? T[M] : never;
// //
// // const add: TypeOfClassMethod<SimComponent, 'componentDidCatch'> = 'aa';
//
// // type Keys<T> = {[P in keyof T]: T[P]}[typeof P]
//
// // type KeyOfType<T, U = Keys<T>> = {[P in keyof T]: T[P] extends U ? P : never}[keyof T]
//
// type KeysWithValsOfType<T,V> = keyof { [ P in keyof T as T[P] extends V ? P : never ] : P };
//
// // interface Thing {
// //     id: string;
// //     price: number;
// //     test: number;
// //     other: { stuff: boolean };
// // }
// //
// // class User1 {
// //     name = 'a';
// //     say() {
// //
// //     }
// // }
// // class User2 extends User1 {
// //     name2 = 'b';
// //     say2() {
// //
// //     }
// // }
// //
// // type keys1 = KeysWithValsOfType<Thing, string>; //id -> ok
// type keys2 = Exclude<KeysWithValsOfType<SimComponent, number>, Component>; //price|test -> ok
// type keys_2 = KeysWithValsOfType<SimComponent, number>; //price|test -> ok
// // type keys22 = KeysWithValsOfType<User2, Function>; //price|test -> ok
// // type keys2222 = KeysWithValsOfType<User1, Function>; //price|test -> ok
// // type kk = Exclude<keys22, keys2222>
// // type keys222 = keyof User2; //price|test -> ok
// // type keys3 = Exclude<KeysWithValsOfType<SimComponent, Function>, keyof Component>; //price|test -> ok
// type zz = Exclude<keyof SimComponent, keyof Component>
// const az: zz = 'beforeRender';
// console.log(az)
// // export type StateConfig<T = any> = {update?: Exclude<Extract<T, Function>, keyof SimComponent | keyof Component>}
// // export type StateConfig<T = any> = {update?: Exclude<Extract<T, Function>, keyof SimComponent | keyof Component>}