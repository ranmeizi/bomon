# @bomon/expand-router

基于 react-router-dom 6 封装一些常用功能

- 切换的过渡动画
- 节点缓存

缓存过渡的示例
[view in codesandbox](https://codesandbox.io/p/sandbox/expand-router-ofynwt)

## 安装

```npm install @bomon/expand-router```

## data route

只支持 v6 的 react-router-dom 的 data route [picking-a-router](https://reactrouter.com/en/main/routers/picking-a-router)  

### 组件

#### TransitionProvider

TransitionProvider 用来实现离场动画，作为上层节点接收 TransitionRoute 传递的残像节点

```javascript
<TransitionProvider>
   <RouterProvider router={createBrowserRouter([{
    path:'/abc',
    element:<TransitionRoute>
        {/* router-view */}
    </TransitionRoute>
   }])}>
   </RouterProvider>
</TransitionProvider>
```

#### TransitionRoute

TransitionRoute 用来实现进场动画，并且会在路由切换组件销毁时，把子节点转移到 TransitionProvider 中，TransitionProvider 的离开动画中就会有上一个页面的残像。


|  参数   | 说明  | 类型 | 默认值 |
|  ----  | ----  | ----  | ----  |
| styles  | 各个状态的 style | TransitionStyles(见下方代码块) | defaultTransitionStyles(见下方代码块) |
| cloneNode  | 为了能正确显示路由残像，在子节点会移动dom时使用 | boolean | false

```ts
export type NavTypes = 'PUSH' | 'REPLACE' | 'POP'
export type States = 'entering' | 'entered' | 'exiting' | 'exited'

export type TransitionStyles = Record<NavTypes, Record<States, React.CSSProperties>>
export const defaultTransitionStyles: TransitionStyles = {
    PUSH: {
        entering: { opacity: 1, transform: 'translateX(100%)' },
        entered: { opacity: 1, transform: 'translateX(0)', transition: '300ms' },
        exiting: { opacity: 1, transform: 'translateX(0)' },
        exited: { opacity: 1, transform: 'translateX(-100%)', transition: '300ms' },
    },
    REPLACE: {
        entering: { opacity: 1, transform: 'translateX(100%)' },
        entered: { opacity: 1, transform: 'translateX(0)', transition: '300ms' },
        exiting: { opacity: 1, transform: 'translateX(0)' },
        exited: { opacity: 1, transform: 'translateX(-100%)', transition: '300ms' },
    },
    POP: {
        entering: { opacity: 1, transform: 'translateX(-100%)' },
        entered: { opacity: 1, transform: 'translateX(0)', transition: '300ms' },
        exiting: { opacity: 1, transform: 'translateX(0)' },
        exited: { opacity: 1, transform: 'translateX(100%)', transition: '300ms' },
    }
};
```

关于**cloneNode**  
在 TransitionRoute 的子节点中如果有像 react-activation 这种操作 dom 的动作，TransitionRoute 无法用 appendChild 的方式形成出场的残像节点，需要 cloneNode 完整复制 dom 节点。这样做会使路由切换时的 dom 节点瞬间增加，在大型应用中会卡顿，慎用。

#### AliveScope/KRoute

使用```react-activation```封装了一个 refresh 时机的 KeepAlive 组件，他的作用是，在 PUSH 和 REPLACE 时，调用 refresh。  
详情见[react-activation](https://github.com/CJY0208/react-activation)

### CSS

TransitionProvider 和 TransitionRoute 中定义了 2 个元素，可以看情况使用 class 选择器对他们的样式进行修改

|  元素   | 用途  |
|  ----  | ----  |
| .er-outview  | 播放出场动画的元素 |
| .er-transition  | 播放入场动画元素 |
