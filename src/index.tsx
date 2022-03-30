import {ConstructorType} from './types/Types';

export class SimpleBoot {
    name = 'SimpleBoot';
    private instance = new Map<ConstructorType<any>, any>();

    get<T>(type: ConstructorType<T>): T {
        if (!this.instance.has(type)) {
        // , params: any[] = []
        //     this.instance.set(type, new type(...params));
            this.instance.set(type, new type());
        }
        return this.instance.get(type);
    }
}

const simpleboot = new SimpleBoot();
export default simpleboot;

