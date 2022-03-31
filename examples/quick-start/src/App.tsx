import React, {Component, Props, useRef} from 'react';
import './App.css';
import {SimComponent} from 'simple-boot-react/components/SimComponent';
import {State} from 'simple-boot-react/decorators/State';
import {Bind} from 'simple-boot-react/decorators/Bind';
import {PropType} from '../../../src/types/Types';
import {UserService} from './services/UserService';
import {ProjectService} from './services/ProjectService';
import {SimContext, SimpleBoot} from 'simple-boot-react';
type Subjection = {
    subscribe(callback: (state: any) => void): void;
    unsubscribe(): void;
}
class User extends SimComponent {
    @State<User>({unmount: 'unsubscribe'})
    subjection:Subjection = {
        subscribe(callback: (state: any) => void) {
            console.log('User subscribe');
        },
        unsubscribe() {
            console.log('User unsubscribe');
        }
    }
    constructor(props: any, ref: any) {
        super(props);
        super.boot();
        console.log('User constructor', props, this, ref)
        // console.log('ppp->', props)
        // props.children?.forEach((child: any) => {
        //     console.log('------', child);
        // })
        // console.table(this, )
        this.subjection.subscribe(()=>{})
    }
    render() {
        console.log('user-redner->', super.sb());
        return <div>user</div>;
    }

    unsubscribe(subjection:Subjection) {
        subjection.unsubscribe();
    }
}


// class App extends SimComponent {
// class App extends Component<any, any> {
class App extends SimComponent {
    @State()
    name = 'name'
    @State<App>({updated: 'changeToggle'})
    toggle = true
    @State<App>({updated: 'changeTime'})
    time = new Date().toISOString();
    ref = React.createRef<HTMLDivElement>();
    ref2 = React.createRef<User>();
    constructor(props: any) {
        super(props);
        super.boot();
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
        super.sb()?.get(UserService).say();
        console.log('app-redner->', super.sb());
        // this.manager.get(UserService).say();
        // this.manager.get(UserService).say();
        // this.manager.get(ProjectService).say();
        // const FancyButton = React.forwardRef((props, ref) => (
        //     <User ref={ref}>asd</User>
        // ));
        // const sampleRef = useRef({});
        // React.createContext({});
        const sampleRef = React.createRef();
        console.log('useRef-->', sampleRef)
        return (
            <div>
                <div>name: {this.name}</div>
                <div>time: {this.time}</div>
                {this.toggle ? <User><div/>22</User> : null}
                <button onClick={()=>{console.log('changename', this); this.name='change name!!'}}>change</button>
                <button onClick={this.clickChangeTime}>bind change</button>
                <button onClick={() => {this.toggle = !this.toggle} }>toggle component</button>
            </div>
        );
    }
}
// console.log('app------1?', App, (App as any).contextType, SimContext);
// (App as any).contextType = SimContext;
// console.log('app------2?', App, (App as any).contextType, SimContext);
// App.contextType = SimContext;
export default App;
