import Config from 'webpack-chain'

export interface Options {
    type: 'react' | 'react-ext',
    minimize?: boolean, // default: true, 当false时，prod也不压缩代码
    chainWebpack?: (config: Config) => void
}

