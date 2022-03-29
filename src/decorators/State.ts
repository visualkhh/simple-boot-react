import {ReflectField} from '../types/Types';

export const StateMetadataKey = Symbol('StateMetadataKey');
export const State: ReflectField = (target: object, propertyKey: string | symbol) => {
        console.log('--State Decorator----', target.constructor, propertyKey);
        const statePropertys = (Reflect.getMetadata(StateMetadataKey, target.constructor) ?? []) as (string|symbol)[];
        statePropertys.push(propertyKey);
        Reflect.defineMetadata(StateMetadataKey, statePropertys, target.constructor)
        console.log('-get->', Reflect.getMetadata(StateMetadataKey, target.constructor))
}
// export type StateSaveConfig = {defaultValue: any, propertyKey: (string|symbol)}
// export const State = (defaultValue: any) => {
//    return (target: object, propertyKey: string | symbol) => {
//         console.log('--State Decorator----', target.constructor, propertyKey);
//         const statePropertys = (Reflect.getMetadata(StateMetadataKey, target.constructor) ?? []) as {defaultValue: any, propertyKey: (string|symbol)}[];
//         statePropertys.push({defaultValue, propertyKey});
//         Reflect.defineMetadata(StateMetadataKey, statePropertys, target.constructor)
//         console.log('-get->', Reflect.getMetadata(StateMetadataKey, target.constructor))
//         // Reflect.metadata()
//     }
//
// }