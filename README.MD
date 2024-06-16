# simple-boot-react
![typescript](https://img.shields.io/badge/-typescript-black?logo=typescript)
[![npm](https://img.shields.io/badge/-npm-black?logo=npm)](https://www.npmjs.com/package/simple-boot-react)

**Our primary goals are**
* Provides react hooks, state, utils, and more.
--- 

- [simple-boot-react](#simple-boot-react)
    - [Installation](#installation)
    - [hooks](#hooks)
        - [usePromiseState](#usePromiseState)
        - [useDependencyCallBackCleanUp](#useDependencyCallBackCleanUp)
        - [useNotFalsy](#useNotFalsy)
        - [useNotNullish](#useNotNullish)
        - [useObservable](#useObservable)
        - [useObservableUnsubscribe](#useObservableUnsubscribe)
        - [usePromise](#usePromise)
        - [usePromiseCleanUp](#usePromiseCleanUp)
        - [usePromiseLazy](#usePromiseLazy)
        - [usePromiseNotNullish](#usePromiseNotNullish)
        - [useWindow](#useWindow)


## Installation
```sh
npm install --save simple-boot-react
```

## hooks
### usePromiseState()
manage the state of the promise.
#### Usage

```tsx
function Component() {
  const data = usePromiseState({
    factory: () => Promise.resolve('hello')
  })
  return (<div>
    <div>{data.state}</div>
    <div>{data.isError}</div>
    <div>{data.isLoading}</div>
    <div>{data.isSuccess && data.data}</div>
  </div>)
}
```

#### option
- usePromiseState<T, RP>: StateHook<T> - T is Promise return type, RP is Factory Parameters type
  - factory: () => Promise<T> - promise factory
  - success: (data: T) => void - success callback
  - error: (error: any) => void - error callback
  - manual: boolean - if true, the promise is not executed automatically.
  - signal: (type: 'retry' | 'success' | 'error' | 'loading' | 'ready', data: StateHook<T>) => void - signal callback
  - executeConfig: { noCacheLoad?: boolean, retry?: number }

### useDependencyCallBackCleanUp()
#### Usage

```tsx
function Component() {
  usePromiseCleanUp(() => {
    return new Promise<() => void>((resolve, reject) => {
      //cleanUp function return 
      resolve(() => {
        console.log('cleanUp')
      })
    });
  }, [data])
  return <div></div>
}
`````````

### useNotFalsy()
#### Usage

```tsx
function Component() {
  const notFalsyData = useNotFalsy((data) => {
    return data.length;
  }, 'data');
  return <div>{notFalsyData.length}</div>
}
```

### useNotFalsyCallBackCleanUp()
#### Usage

```tsx
function Component() {
  useNotFalsyCallBackCleanUp((data) => {
    return () => {
      console.log('useNotFalsyCallBackCleanUp cleanUp')
    }
  }, data)
  return <div></div>
}
```

### useNotNullish()
#### Usage

```tsx
function Component() {
  const notNullishData = useNotNullish((data) => {
    return data.length;
  }, 'data');
  return <div>{notNullishData}</div>
}
```

### useNotNullishCallBackCleanUp()
#### Usage

```tsx
function Component() {
  useNotNullishCallBackCleanUp((data) => {
    return () => {
      console.log('useNotNullishCallBackCleanUp cleanUp')
    }
  }, data)
  return <div>{notNullishData}</div>
}
```

### useObservable()
#### Usage

```tsx
function Component() {
  return <div></div>
}
```

### useObservableUnsubscribe()
#### Usage

```tsx
function Component() {
  useObservableUnsubscribe(() => {
    return subject.pipe(debounceTime(500), distinctUntilChanged()).subscribe(it => {
     // ... 
    })
  })
  return <div></div>
}
```

### usePromise()
#### Usage

```tsx
function Component() {
  return <div></div>
}
```

### usePromiseCleanUp()
#### Usage

```tsx
function Component() {
  return <div></div>
}
```

### usePromiseLazy()
#### Usage

```tsx
function Component() {
  return <div></div>
}
```

### usePromiseNotNullish()
#### Usage

```tsx
function Component() {
  return <div></div>
}
```

### useWindow()
#### Usage

```tsx
function Component() {
  return <div></div>
}
```
