import React from 'react';
//@ts-ignore
import logo from './logo.svg';
import './App.css';
import { useNotFalsy, usePromiseCleanUp, usePromiseState, useNotFalsyCallBackCleanUp, useNotNullish, useNotNullishCallBackCleanUp } from 'simple-boot-react';

function App() {
  const data = usePromiseState({
    factory: () => {
      return new Promise<string>((resolve, reject) => {
        // resolve('test');
        // reject('test' + Math.random());
        setTimeout(() => {
          // resolve('test');
          if (Math.random() > 0.5) {
          console.log('success!!')
            resolve('success!!' + Math.random());
          } else {
          console.log('reject!!')
            reject('error!!!!!!!' + Math.random());
          }
        }, ((Math.random()) * 1000) * 2);
      });
    },
    success: (e) => {
      console.log('success-->', e.data, e.lastSuccessData, e.lastErrorData)
    },
    error: (e) => {
      console.log('error-->', e.data, e.lastSuccessData, e.lastErrorData)
      // e.refresh();
    }, signal: (type, data) => {
      console.log('signal------------------->', type, data)
    }, executeConfig: {retry: 4}
  })

  console.log('page-data', data);

  // usePromiseCleanUp(() => {
  //   return new Promise<() => void>((resolve, reject) => {
  //     console.log('usePromiseCleanUp-->')
  //     resolve(() => {
  //       console.log('cleanUp-->', 'cleanUp')
  //     })
  //   });
  // }, [data])

  // const notFalsyData = useNotFalsy((data) => {
  //   return data.length;
  // }, '4zz', 44444);
  // useNotFalsyCallBackCleanUp((data) => {
  //   return () => {
  //     console.log('useNotFalsyCallBackCleanUp cleanUp')
  //   }
  // }, data)

  const notNullishData = useNotNullish((data) => {
    return data.length;
  }, 'data');
  useNotNullishCallBackCleanUp((data) => {
    return () => {
      console.log('useNotNullishCallBackCleanUp cleanUp')
    }
  }, data)

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {/*{notNullishData}*/}
          {/*{notFalsyData}*/}
        </div>
        <div>
          {data.state}
        </div>
        <div>
          <button onClick={e => {
            if (data.isFetchable) {
              data.refreshMaintain();
            }
          }}>retry
          </button>
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
