import {ConstructorType, ReflectMethod} from '../types/Types';

export const BindMetadataKey = Symbol('BindMetadataKey');
export const Bind:ReflectMethod = (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        const statePropertys = (Reflect.getMetadata(BindMetadataKey, target.constructor) ?? []) as (string|symbol)[];
        statePropertys.push(propertyKey);
        Reflect.defineMetadata(BindMetadataKey, statePropertys, target.constructor)
}

export const GetBinds = (target: ConstructorType<any> | Function | any): string[] => {
        // const constructor = Object.getPrototypeOf(this).constructor;
        if (null != target && typeof target === 'object') {
                target = target.constructor;
        }
        return Reflect.getMetadata(BindMetadataKey, target) as string[] ?? []
}