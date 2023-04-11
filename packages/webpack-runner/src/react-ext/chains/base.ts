import Config from 'webpack-chain'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import webpack from 'webpack'
import TerserPlugin from "terser-webpack-plugin"
import { getEntries, useHtmlPlugin } from '../utils/io'
import path from 'path'
import { Options } from '../../type'

const PNPM_LINKED_WORKSPACE = 'node_modules/@bomon/webpack-runner/node_modules'

export default function (options: Options, config: Config) {
    // 处理入口
    const entries = getEntries()

    for (let prop in entries) {
        config.entry(prop).add(entries[prop])
    }

    // 处理html
    const htmlPluginOptions = useHtmlPlugin()

    for (let option of htmlPluginOptions) {
        config.plugin(`html-${option.title}`).use(HtmlWebpackPlugin, [option])
    }

    config.output
        .publicPath('/')
        .set('clean', true)

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