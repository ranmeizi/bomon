# @bomon/expand-router

基于 react-router-dom 封装一些常用功能

## data route

只支持 v6 的 react-router-dom 的 data route [picking-a-router](https://reactrouter.com/en/main/routers/picking-a-router)

### 组件

#### TransitionOutlet

TransitionOutlet 在子节点 Outlet 外面包裹了一层 ```react-transition-group``` 使 outlet 组件切换时，元素拥有过渡动画

#### ActionKeepAlive

在 ```react-activation``` 的 KeepAlive 组件的基础上，增加了1个功能，当 react-router 的 navigationType 是 PUSH 的时候，手动调用 api 清除缓存

saveScrollPosition 对 dom 的操作会让 csstransition 的过度有些问题, 在使用 KeepAlive 时 我先关闭这个功能了