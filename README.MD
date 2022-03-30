# SIMPLE-BOOT-REACT
![typescript](https://img.shields.io/badge/-typescript-black?logo=typescript)
[![npm](https://img.shields.io/badge/-npm-black?logo=npm)](https://www.npmjs.com/package/simple-boot-react)

**Our primary goals are**
* help you use the effect easily.
--- 

# 😃 examples
- [examples](./examples)

## SimCponent 
* SimComponent extends React.Component
* 💥 call super.boot()

## @State
▼ state
```tsx
import {SimComponent} from 'simple-boot-react/components/SimComponent';
import {State} from 'simple-boot-react/decorators/State';
import {Bind} from 'simple-boot-react/decorators/Bind';
class Apps extends SimComponent {
    @State()
    name = 'name'
    constructor(props: any) {
        super(props);
        super.boot();
    }

    render() {
        return (
            <div>
                <div>name: {this.name}</div>
                <button onClick={()=>{this.name='change name!!'}}>change</button>
            </div>
        );
    }
}
export default Apps;
```

▼ updated
```tsx

class Apps extends SimComponent {
    @State<Apps>({updated: 'changeToggle'})
    toggle = true
    constructor(props: any) {
        super(props);
        super.boot();
    }

    changeToggle(prev: boolean, current: boolean) {
        console.log('changeToggle', prev, current);
    }

    render() {
        return (
            <div>
                {this.toggle ? <div>toogle show</div> : null}
                <button onClick={() => {this.toggle = !this.toggle} }>toggle component</button>
            </div>
        );
    }
}
```
▼ unMounted
```tsx
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
```

## @Bind
```tsx
import {SimComponent} from 'simple-boot-react/components/SimComponent';
import {State} from 'simple-boot-react/decorators/State';
import {Bind} from 'simple-boot-react/decorators/Bind';
class Apps extends SimComponent {
    @State()
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
                <div>time: {this.time}</div>
                <button onClick={this.changeAge}>bind change</button>
            </div>
        );
    }
}

export default Apps;
```


<details>
  <summary>enable typescript decorator</summary>

tsconfig.json
```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```
### vite
```typescript
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        [
          "@babel/plugin-proposal-class-properties",
          { loose: true },
        ],
      ],
    }
  })]
})
```
</details>
