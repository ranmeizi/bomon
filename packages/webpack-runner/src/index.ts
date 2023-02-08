import webpack from 'webpack'
import { Options } from './type'
import reactCreator from './react'
import devServer from './devServer'

function createConfig(options: Options) {
    let config = null
    switch (options.type) {
        case 'react': config = reactCreator(options); break;
        default: throw new TypeError(`@bomon/webpack-runner,options.type error, need 'react',recived ${options.type}`)
    }

    if (options.chainWebpack && typeof options.chainWebpack === 'function') {
        options.chainWebpack(config)
    }

    return config.toConfig()
}

export function runner(options: Options) {
    const config = createConfig(options)
    // run
    const compiler = webpack(config, (e, stats) => {
        stats && console.error(stats?.toString())
    })
    // devserver
    devServer(options, compiler)
}