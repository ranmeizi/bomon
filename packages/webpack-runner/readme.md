# webpack-runner

封装了一些 webpack 基础配置，提供 runner 函数和 chain 修改配置

## 安装

`npm install @bomon/webpack-runner -D`

## 运行

```javascript
// runner.js
const runner = require("@bomon/webpack-runner").runner;

runner({
  type: "react",
  chainWebpack(config) {
    // ...
  },
});
```

在 package.json 添加 scripts
全局或项目安装`cross-env`使用 cross-env 添加环境变量

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
  type: "react" | "react-ext";
  // 修改基础配置的chain
  chainWebpack?: (config: Config) => void;
}
```

### react-ext

react-ext 是为了使用 react 快速开发 html 页面，并且使用模块化，使用规定的目录，我会自动写入manifest，其余的请自己写。

建议在开发时开启source-map，发布时关闭

runner 会根据文件夹搜索 entries 并完成 output，所以我按照 extension 的资源类型，设置了目录规范。

```
目录规范
--src
  --scripts
    --background.js         background
    --content_scripts       插件注入的js
    --inject_scripts        代码注入的js
    ......
    --[whatever].js         其余的
  --pages
    --popup                 popup页面
    ......
    --[whatever]            其余页面

输出规范 (程序会自动写入manifest配置。如 content/inject script 和 popup，其余自己补充)
// output dir
--output
  --background.js
  --content_scripts         插件注入的js
    --[name].js
  --inject_scripts          代码注入的js
    --[name].js
  --css                     样式文件
    --[name].css
  --js
    --[page].js             页面入口
  --manifest.json           只支持v3版本，请使用v3
  --[page].html             页面文件
```

### asset module

webpack 的 image font 资源模块类型

```ts
import "@bomon/webpack-runner/wr.env";
```
