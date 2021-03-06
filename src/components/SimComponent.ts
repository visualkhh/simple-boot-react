import {Component, Dispatch, ReactNode, SetStateAction, useContext} from 'react';
import 'reflect-metadata'
import {GetStates, StateMetadataKey, StateSaveConfig} from '../decorators/State';
import {BindMetadataKey, GetBinds} from '../decorators/Bind';
import simpleBoot, {SimpleBoot} from '../index';
export class SimComponent<P = any, S = any, SS = any> extends Component<P, S, SS>{
    // private __isBoot = false;
    constructor(props: P) {
        super(props);
        // SimComponent.manager();
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
        // const target = this;
        // if (null != target && typeof target === 'object') {
        //     const c = target.constructor as any;
        //     c.contextType = SimContext;
        // }
        this.componentDidMount = ((origin?: () => void) => {
            return () => {
                this.beforeComponentDidMount();
                origin?.bind(this)();
            }
        })(this.componentDidMount);

        this.componentDidUpdate = ((origin?: (prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: SS) => void) => {
            return (prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: SS) => {
                this.beforeComponentDidUpdate(prevProps, prevState, snapshot);
                origin?.bind(this)(prevProps, prevState, snapshot);
            }
        })(this.componentDidUpdate);

        this.shouldComponentUpdate = ((origin?: (nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any) => boolean) => {
            return (nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any) => {
                const sw = this.beforeShouldComponentUpdate(nextProps, nextState, nextContext);
                if (sw && origin) {
                    return origin.bind(this)(nextProps, nextState, nextContext);
                } else {
                    return true;
                }
            }
        })(this.shouldComponentUpdate);

        this.render = ((origin: () => ReactNode) => {
            return () => {
                this.beforeRender();
                return origin.bind(this)();
            }
        })(this.render);

        this.componentWillUnmount = ((origin?: () => void) => {
            return () => {
                this.beforeComponentWillUnmount();
                origin?.bind(this)();
            }
        })(this.componentWillUnmount);

        const statePropertys = GetStates(this);
        if (statePropertys.length) {
            (this.state as any) = {};
            statePropertys.forEach(it => {
                (this.state as any)[it.propertyKey] = (this as any)[it.propertyKey];
                Object.defineProperty(this, it.propertyKey, {
                    get() {
                        return (this.state as any)[it.propertyKey];
                    },
                    set(value: any) {
                        // this.setState(Object.assign({}, this.state, {[it]: value}))
                        this.setState((preve: S, current: S) => {
                            return {[it.propertyKey]: value};
                        });
                    },
                    configurable: true
                });
            })
        }

        const bindPropertys = GetBinds(this);
        if (bindPropertys.length) {
            bindPropertys.forEach(it => {
                (this as any)[it] =  (this as any)[it].bind(this);
            })
        }


    }

    private beforeRender() {
        // console.log('--->', 'beforeRender', this)
    }
    //componentDidMount() ???????????? ???????????? ???????????? DOM??? ????????? ??? ?????? ???????????????. ??? ????????? ???????????? ??????????????? ?????? ???????????????.
    private beforeComponentDidMount() {
        // console.log('--->', 'beforeComponentDidMount')
    }
    private beforeComponentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: SS) {
        GetStates(this).filter(it => it.config.updated).forEach(it => {
            const prev = (prevState as any)[it.propertyKey];
            const current = (this.state as any)[it.propertyKey];
            if (prev !== current) {
                (this as any)[it.config.updated!]?.(prev, current);
            }
        })
    }
    private beforeShouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        // console.log('--->', 'beforeShouldComponentUpdate');
        return true;
    }
    private beforeComponentWillUnmount() {
        GetStates(this).filter(it => it.config.unmount).forEach(it => {
            const current = (this.state as any)[it.propertyKey];
            (this as any)[it.config.unmount!]?.(current);
        })
    }

    public sb(): SimpleBoot {
        return simpleBoot;
    }
}