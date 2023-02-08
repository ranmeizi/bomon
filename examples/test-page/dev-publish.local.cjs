const main = require('@bomon/dev-publish')

const connection = {
    host: '127.0.0.1',
    port: 10022,
    username: 'test',
    password: 'test',
    path: '/home/test/app'
}

main({
    folder: 'dist', // 需要传输的文件夹
    rename: 'react-example', // 重命名
    connection: connection // 连接信息
})