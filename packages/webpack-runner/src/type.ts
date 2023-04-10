import Config from 'webpack-chain'

export interface Options {
    type: 'react' | 'react-ext',
    chainWebpack?: (config: Config) => void
}

