import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Injectable} from 'simple-boot-react/decorators/Injectable';
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


@Injectable()
class Test{

    constructor(s: string) {
    }
}
const a = Reflect.getMetadata('design:paramtypes', Test)
console.log('----->', a)