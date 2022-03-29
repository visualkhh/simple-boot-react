import {ConstructorType, GenericClassDecorator} from '../types/Types';

export const InjectableMetadataKey = Symbol('InjectableMetadataKey');
// export const sims = new Set<ConstructorType<any>>();
export interface InjectableConfig {
    // scheme?: string;
}
export const Injectable = (config: InjectableConfig = {}) =>  {
    return (constructor: Function) => {
        Object.seal(constructor);
        Object.seal(constructor.prototype);
    }
}
// export const Sim = (config: InjectableConfig = {}): GenericClassDecorator<ConstructorType<any>> => {
//     return (target: ConstructorType<any>) => {
//         ReflectUtils.defineMetadata(SimMetadataKey, config, target);
//         sims.add(target);
//     }
// }
