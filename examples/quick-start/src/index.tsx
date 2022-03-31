import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {SimContext, SimpleBoot} from 'simple-boot-react';

ReactDOM.render(
    <React.StrictMode>
        <SimContext.Provider value={new SimpleBoot({name:'root'})}>
            <App/>
        </SimContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);