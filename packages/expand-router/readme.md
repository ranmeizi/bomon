# @bomon/expand-router

基于 react-router-dom 封装一些常用功能

这个模块为了封装路由切换的代码，使小项目或是对过渡动画要求不高的项目直接使用，并不适合所有情况

## data route

只支持 v6 的 react-router-dom 的 data route [picking-a-router](https://reactrouter.com/en/main/routers/picking-a-router)  

### 组件

#### KRoute

使用```react-activation```封装了一个 refresh 时机的 KeepAlive 组件，他的作用是，在 PUSH 和 REPLACE 时，调用 refresh。
即只有后退时，看得到节点上一次的状态。

#### TransitionProvider

TransitionProvider 用来实现离场动画，接收 TransitionRoute 传递的残像节点

#### TransitionRoute

TransitionRoute 用来实现进场动画，并且会在路由切换组件销毁时，把字节点转移到 TransitionProvider 中，TransitionProvider 的离开动画中就会有上一个页面的残像。

### KRoute 示例

```javascript
// router config
{
    path: "/path",
    element: <KRoute>
        <RouterView />
    </KRoute>,
},
```

### Transition 示例

先定义 transition 窗口，transition 的 view 都会相对窗口定位

```javascript
// TabView
export default function () {
    const outlet = useOutlet()

    return <Box>
        {/* 路由窗口 */}
        <div style={{flex:1}}>
            <TransitionProvider>
                {outlet}
            </TransitionProvider>
        </div>
        {/* tab 切换 */}
        {/* 省略 */}
    </Box>
}
```

将带有 TransitionProvider 的组件放在正确的节点

```js
{
    path: "/t",
    element: <TabView />,
    children: [
        {
            path: "/t/favorites",
            element: <TransitionRoute>
                <Favorites />
            </TransitionRoute>,
        },
        {
            path: "/t/nearby",
            element: <TransitionRoute>
                <Nearby />
            </TransitionRoute>,
        },
        {
            path: "/t/recents",
            element: <TransitionRoute>
                <Rectnts />
            </TransitionRoute>,
        },
    ],
},
```