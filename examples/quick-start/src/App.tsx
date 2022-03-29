import React, {useState} from 'react';
import './App.css';
import {SimComponent} from 'simple-boot-react/components/SimComponent';
import {State} from 'simple-boot-react/decorators/State';
import {Bind} from 'simple-boot-react/decorators/Bind';

class Apps extends SimComponent {
    @State
    name = 'name'
    @State
    time = new Date().toISOString();
    constructor(props: any) {
        super(props);
        super.boot();
    }

    @Bind
    changeAge() {
        this.time = new Date().toISOString()
    }
    render() {
        return (
            <div>
                <div>name: {this.name}</div>
                <div>time: {this.time}</div>
                <button onClick={()=>{this.name='change name!!'}}>change</button>
                <button onClick={this.changeAge}>bind change</button>
            </div>
        );
    }
}
declare function f1(arg: { a: number; b: string }): void;

// type T0 = Parameters<() => string>;
//
// type T0 = []
// type T1 = Parameters<(s: string) => void>;
// console.log('----------', Parameters<(s: string) => void>)
// type T1 = [s: string]
// type T2 = Parameters<<T>(arg: T) => T>;
//
// type T2 = [arg: unknown]
// type T3 = Parameters<typeof f1>;
//
// type T3 = [arg: {
//     a: number;
//     b: string;
// }]
// type T4 = Parameters<any>;
//
// type T4 = unknown[]
// type T5 = Parameters<never>;

export default Apps;
