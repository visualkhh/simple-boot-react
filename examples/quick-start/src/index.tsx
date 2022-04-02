import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import simpleBoot, {SimpleBoot} from 'simple-boot-react'
import {ProjectService} from './services/ProjectService';
import {ConstructorType} from 'simple-boot-react/types/Types';
import {UserService} from './services/UserService';
simpleBoot.setFactory(UserService, (sb: SimpleBoot, type: ConstructorType<UserService>) => {
  return new type(sb.instance(ProjectService));
})
ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);