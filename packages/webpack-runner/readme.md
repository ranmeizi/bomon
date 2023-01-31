# webpack-runner

封装了一些 webpack 基础配置，提供 runner 函数和 chain 修改配置

```javascript
const runner = require('@bomon/webpack-runner')

runner({
    type: 'react',
    webpackChaining(config){
        // ...
    }
})
```