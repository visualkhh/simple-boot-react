import {Component, Dispatch, SetStateAction} from 'react';
import 'reflect-metadata'
import {StateMetadataKey} from '../decorators/State';
import {BindMetadataKey} from '../decorators/Bind';
// import {SimOption} from 'simple-boot-core/SimOption';
// SimOption
export class SimComponent<P = any, S = any> extends Component<P, S>{
    constructor(props: P) {
        super(props);
    }

    // shouldComponentUpdate() {
    //     console.log('shouldComponentUpdate---------')
    //     if (!this._isBoot) {
    //         this.boot();
    //         this._isBoot = true;
    //     }
    //     return true;
    // }

    protected boot() {
        const constructor = Object.getPrototypeOf(this).constructor;
        const statePropertys = Reflect.getMetadata(StateMetadataKey, constructor) as string[] | undefined
        if (statePropertys) {
            (this.state as any) = {};
            statePropertys?.forEach(it => {
                (this.state as any)[it] = (this as any)[it];
                Object.defineProperty(this, it, {
                    get() {
                        console.log('----gggggggget?', it)
                        return (this.state as any)[it];
                    },
                    set(value: any) {
                        this.setState(Object.assign({}, this.state, {[it]: value}))
                    },
                    configurable: true
                });
            })
        }

        const bindPropertys = Reflect.getMetadata(BindMetadataKey, constructor) as string[] | undefined
        if (bindPropertys) {
            bindPropertys?.forEach(it => {
                (this as any)[it] =   (this as any)[it].bind(this);
            })
        }

        const a = Reflect.getMetadata('design:paramtypes', this)
        const b = Reflect.getMetadata('design:paramtypes', constructor)
        console.log('------->', a, b)




    }
}