# webpack-runner

封装了一些 webpack 基础配置，提供 runner 函数和 chain 修改配置

## 安装

```npm install @bomon/webpack-runner -D```

## 运行

```javascript
// runner.js
const runner = require('@bomon/webpack-runner').runner

runner({
    type: 'react',
    chainWebpack(config){
        // ...
    }
})
```

在 package.json 添加 scripts
使用 cross-env 添加环境变量

```json
{
    "start": "cross-env NODE_ENV=development node runner.cjs",
    "build": "cross-env NODE_ENV=production node runner.cjs"
}
```

### Options

```ts
export interface Options {
    // 类型
    type: 'react';
    // 修改基础配置的chain
    chainWebpack?: (config: Config) => void;
}
```

### asset module

webpack 的 image font 资源模块类型

```ts
import '@bomon/webpack-runner/dist/wr.env'
```
