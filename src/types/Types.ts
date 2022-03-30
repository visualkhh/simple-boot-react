export interface ConstructorType<T> {
    new(...args: any[]): T;
}
export type GenericClassDecorator<T> = (target: T) => void;
export type ReflectField = (target: Object|{constructor: ConstructorType<any>, [key: string]: Function}, propertyKey: string | symbol) => void;
export type ReflectMethod = (target: any|ConstructorType<any>|{constructor: ConstructorType<any>, [key: string]: Function}, propertyKey: string, descriptor: PropertyDescriptor) => any;
export type MethodParameter = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;


export type KeysWithValsOfType<T,V> = keyof { [ P in keyof T as T[P] extends V ? P : never ] : P };