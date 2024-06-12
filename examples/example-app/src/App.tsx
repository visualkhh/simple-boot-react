import React from 'react';
//@ts-ignore
import logo from './logo.svg';
import './App.css';
import { usePromiseCleanUp, usePromiseState } from 'simple-boot-react';

console.log('main-->', React, usePromiseCleanUp);

// console.log('main-->', React, usePromiseOf);
function App() {
  const data = usePromiseState({
    factory: () => {
      return new Promise<string>((resolve, reject) => {
          console.log('iiiiin')
          // resolve('test');
        // reject('test' + Math.random());
        setTimeout(() => {
          console.log('iiiiin')
          // resolve('test');
          if (Math.random() > 0.5) {
            resolve('test');
          } else {
          reject('test' + Math.random());
          }
        }, ((Math.random() ) * 1000) * 2);
      });
    },
    success: (e) => {
      console.log('success-->', e)
    },
    error: (e) => {
      console.log('error-->', e)
      // e.refresh();
    }, executeConfig: {retry: 5}
  })


  usePromiseCleanUp(() => {
    return new Promise<() => void>((resolve, reject) => {
      console.log('usePromiseCleanUp-->')
      resolve(() => {
        console.log('cleanUp-->', 'cleanUp')
      })
    });
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <div>
        {data.state}
        </div>
        <div>
          <button onClick={e => {
            if (data.isFetchable) {
              data.refreshMaintain();
            }
          }}>retry</button>
        </div>
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
