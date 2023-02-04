# @bomon/dev-publish

使用 nodejs scp ssh 部署您打包好的 dist 文件夹，方便开发时快速部署应用

## 安装

```npm install @bomon/dev-publish -D```

## 运行

### dev-publish.local.cjs

在本地创建 dev-publish.local.cjs 文件调用执行函数
**非常重要**
因为里面存在敏感的连接信息 , 所以一定要使用 **gitignore** 忽略提交这个文件

```js
// dev-publish.cjs
const main = require('@bomon/dev-publish')

const connection = {
    host: '',
    port: 22,
    username: '',
    password: '',
    path: ''
}

main({
    folder: '', // 需要传输的文件夹
    rename: '', // 重命名
    connection: connection // 连接信息
})
```
