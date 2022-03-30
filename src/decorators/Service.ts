import {ConstructorType, GenericClassDecorator} from '../types/Types';

export const ServiceMetadataKey = Symbol('ServiceMetadataKey');
// export const sims = new Set<ConstructorType<any>>();
export interface ServiceConfig {
    // scheme?: string;
}
export const Service = (config: ServiceConfig = {}) =>  {
    return (constructor: Function) => {
    }
}
// export const Sim = (config: InjectableConfig = {}): GenericClassDecorator<ConstructorType<any>> => {
//     return (target: ConstructorType<any>) => {
//         ReflectUtils.defineMetadata(SimMetadataKey, config, target);
//         sims.add(target);
//     }
// }
