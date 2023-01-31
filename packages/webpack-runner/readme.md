# webpack-runner

封装了一些 webpack 基础配置，提供 runner 函数和 chain 修改配置

## 安装

```npm install @bomon/webpack-runner -D```

### 运行依赖

需要安装 babel-loader 相关的运行依赖
```npm install @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript babel-loader -D```

## 运行

```javascript
const runner = require('@bomon/webpack-runner')

runner({
    type: 'react',
    webpackChaining(config){
        // ...
    }
})
```
