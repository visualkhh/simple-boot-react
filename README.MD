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
### useDependencyCallBackCleanUp()

useDependencyCallBackCleanUp

#### Usage

```tsx
function Component() {
  return <div></div>
}
`````````

### useNotFalsy()

useNotFalsy

#### Usage

```tsx
function Component() {
  return <div></div>
}
```

### useNotNullish()

useNotNullish

#### Usage

```tsx
function Component() {
  return <div></div>
}
```

### useObservable()

useObservable

#### Usage

```tsx
function Component() {
  return <div></div>
}
```

### useObservableUnsubscribe()

useObservableUnsubscribe

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

usePromise

#### Usage

```tsx
function Component() {
  return <div></div>
}
```

### usePromiseCleanUp()

usePromiseCleanUp

#### Usage

```tsx
function Component() {
  return <div></div>
}
```

### usePromiseLazy()

usePromiseLazy

#### Usage

```tsx
function Component() {
  return <div></div>
}
```

### usePromiseNotNullish()

usePromiseNotNullish

#### Usage

```tsx
function Component() {
  return <div></div>
}
```

### useWindow()

useWindow

#### Usage

```tsx
function Component() {
  return <div></div>
}
```
