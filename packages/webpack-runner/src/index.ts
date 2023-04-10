import webpack from 'webpack'
import { Options } from './type'
import reactCreator from './react'
import reactExtensionCreator from './react-ext'
import devServer from './devServer'

function createConfig(options: Options) {
    let config = null

    initializeOption(options)

    switch (options.type) {
        case 'react': config = reactCreator(options); break;
        case 'react-ext': config = reactExtensionCreator(options); break;
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

function initializeOption(options: Options) {
    if (options.minimize === undefined) {
        options.minimize = true
    }
}