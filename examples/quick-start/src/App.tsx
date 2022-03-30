import React, {useState} from 'react';
import './App.css';
import {SimComponent} from 'simple-boot-react/components/SimComponent';
import {State} from 'simple-boot-react/decorators/State';
import {Bind} from 'simple-boot-react/decorators/Bind';
type Subjection = {
    subscribe(callback: (state: any) => void): void;
    unsubscribe(): void;
}
class User extends SimComponent {
    @State<User>({unMount: 'unsubscribe'})
    subjection:Subjection = {
        subscribe(callback: (state: any) => void) {
            console.log('User subscribe');
        },
        unsubscribe() {
            console.log('User unsubscribe');
        }
    }
    constructor(props: any) {
        super(props);
        super.boot();
        console.log('User constructor')
        this.subjection.subscribe(()=>{})
    }
    render() {
        return <div>user</div>;
    }

    unsubscribe(subjection:Subjection) {
        subjection.unsubscribe();
    }
}


class Apps extends SimComponent {
    @State()
    name = 'name'
    @State<Apps>({updated: 'changeToggle'})
    toggle = true
    @State<Apps>({updated: 'changeTime'})
    time = new Date().toISOString();
    ref = React.createRef<HTMLDivElement>();
    constructor(props: any) {
        super(props);
        super.boot();
        console.log('Apps constructor');
    }

    changeToggle(prev: boolean, current: boolean) {
        console.log('changeToggle', prev, current);
    }

    changeTime(prev: boolean, current: boolean) {
        console.log('changeTime', prev, current);
    }

    @Bind
    clickChangeTime() {
        console.log('------bind this', this)
        this.time = new Date().toISOString()
        console.log('-->', this.ref.current)
    }

    render() {
        return (
            <div>
                <div>name: {this.name}</div>
                <div>time: {this.time}</div>
                {this.toggle ? <User></User> : null}
                <button onClick={()=>{console.log('changename', this); this.name='change name!!'}}>change</button>
                <button onClick={this.clickChangeTime}>bind change</button>
                <button onClick={() => {this.toggle = !this.toggle} }>toggle component</button>
            </div>
        );
    }
}

export default Apps;
