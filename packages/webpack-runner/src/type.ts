import Config from 'webpack-chain'

export interface Options {
    type: 'react',
    chainWebpack?: (config: Config) => void
}