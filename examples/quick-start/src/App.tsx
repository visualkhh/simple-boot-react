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

export default Apps;
