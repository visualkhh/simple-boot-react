import {ConstructorType} from './types/Types';
import React from 'react';

// export type SimConfig = {
//     name?: string;
//     factory?: [ConstructorType<any>, (simpleboot: SimpleBoot) => void][]
//
// }
export class SimpleBoot {
    name = 'SimpleBoot';
    private instances = new Map<ConstructorType<any>, any>();
    private factorys = new Map<ConstructorType<any>, (sb: SimpleBoot, type: ConstructorType<any>) => any>();

    constructor() {
    }


    setFactory<T>(type: ConstructorType<T>, factory: (sb: SimpleBoot, type: ConstructorType<T>) => T) {
        this.factorys.set(type, factory);
    }



    instance<T>(type: ConstructorType<T>): T {
        if (!this.instances.has(type)) {
            const factory = this.factorys.get(type);
            const instance = factory?.(this, type) ?? new type()
            this.instances.set(type, instance);
        }
        return this.instances.get(type);
    }
}

export default new SimpleBoot();
// export const simpleBoot = new SimpleBoot();
// export const SimContext = React.createContext(new SimpleBoot(simpleBoot));
