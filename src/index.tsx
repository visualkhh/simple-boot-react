import {ConstructorType} from './types/Types';
import React from 'react';

export class SimpleBoot {
    name = 'SimpleBoot';
    private instance = new Map<ConstructorType<any>, any>();

    constructor({name = 'SimpleBoot'}: {name?: string} = {}) {
        this.name = name;
    }

    get<T>(type: ConstructorType<T>): T {
        if (!this.instance.has(type)) {
        // , params: any[] = []
        //     this.instance.set(type, new type(...params));
            this.instance.set(type, new type());
        }
        return this.instance.get(type);
    }
}


export const SimContext = React.createContext(new SimpleBoot({name: 'ggg'}));

