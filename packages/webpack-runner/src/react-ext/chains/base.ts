import Config from 'webpack-chain'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import webpack from 'webpack'
import TerserPlugin from "terser-webpack-plugin"
import path from 'path'

const PNPM_LINKED_WORKSPACE = 'node_modules/@bomon/webpack-runner/node_modules'

export default function (config: Config) {
    // 处理入口

    config.entries

    /**
     * @description resolve 
     * [https://webpack.js.org/configuration/resolve/]
     */
    config.resolve.extensions
        .add('.tsx')
        .add('.ts')
        .add('.js')
    config.resolve.alias.set('@', path.resolve(process.cwd(), "src/"))

    // pnpm
    config.resolve.modules
        .add(path.resolve(process.cwd(), "node_modules"))
        .add(PNPM_LINKED_WORKSPACE)
        .add('node_modules')

    config.resolveLoader.modules
        .add(path.resolve(process.cwd(), "node_modules"))
        .add(PNPM_LINKED_WORKSPACE)
        .add('node_modules')
}