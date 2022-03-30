import {ConstructorType, KeysWithValsOfType, ReflectField} from '../types/Types';
import {SimComponent} from '../components/SimComponent';
import {Component} from 'react';

export const StateMetadataKey = Symbol('StateMetadataKey');

export type StateConfig<T = any> = {
    updated?: Exclude<KeysWithValsOfType<T, Function>, keyof Component>;
    unMount?: Exclude<KeysWithValsOfType<T, Function>, keyof Component>;
}
// export type StateConfig<T = any> = { update?: Exclude<KeysWithValsOfType<T, Function>, keyof Component> }

export type StateSaveConfig = { config: StateConfig, propertyKey: (string | symbol) }
export const State = <T = any>(config: StateConfig<T> = {}): ReflectField => {
    return (target: object, propertyKey: string | symbol) => {
        console.log('--State Decorator----', target, target.constructor, propertyKey);
        const statePropertys = (Reflect.getMetadata(StateMetadataKey, target.constructor) ?? []) as StateSaveConfig[];
        statePropertys.push({config, propertyKey});
        Reflect.defineMetadata(StateMetadataKey, statePropertys, target.constructor)
        console.log('-get->', Reflect.getMetadata(StateMetadataKey, target.constructor))
    }
}

export const GetStates = (target: ConstructorType<any> | Function | any): StateSaveConfig[] => {
    // const constructor = Object.getPrototypeOf(this).constructor;
    if (null != target && typeof target === 'object') {
        target = target.constructor;
    }
    return Reflect.getMetadata(StateMetadataKey, target) as StateSaveConfig[] ?? []
}
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

// const b = <T=any>() => {
//
// }
// function a<T=any> () {
//
// }