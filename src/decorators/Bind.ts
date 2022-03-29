import {ReflectMethod} from '../types/Types';

export const BindMetadataKey = Symbol('BindMetadataKey');
export const Bind:ReflectMethod = (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        const statePropertys = (Reflect.getMetadata(BindMetadataKey, target.constructor) ?? []) as (string|symbol)[];
        statePropertys.push(propertyKey);
        Reflect.defineMetadata(BindMetadataKey, statePropertys, target.constructor)
}