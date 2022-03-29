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
* 💥 Essential! call super.boot()

## @State
```tsx
import {SimComponent} from 'simple-boot-react/components/SimComponent';
import {State} from 'simple-boot-react/decorators/State';
import {Bind} from 'simple-boot-react/decorators/Bind';
class Apps extends SimComponent {
    @State
    name = 'name'
    constructor(props: any) {
        super(props);
        super.boot(); // 💥 call super.boot()
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
## @Bind
```tsx
import {SimComponent} from 'simple-boot-react/components/SimComponent';
import {State} from 'simple-boot-react/decorators/State';
import {Bind} from 'simple-boot-react/decorators/Bind';
class Apps extends SimComponent {
    @State
    time = new Date().toISOString();
    constructor(props: any) {
        super(props);
        super.boot(); // 💥 call super.boot()
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
    // ....
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
