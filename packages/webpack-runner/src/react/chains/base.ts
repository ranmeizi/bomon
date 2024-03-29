import Config from 'webpack-chain'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import webpack from 'webpack'
import TerserPlugin from "terser-webpack-plugin"
import path from 'path'
import { Options } from '../../type'

const PNPM_LINKED_WORKSPACE = 'node_modules/@bomon/webpack-runner/node_modules'

export default function (options: Options, config: Config) {

    // when dev
    config.when(process.env.NODE_ENV === 'development', config => {

        config.merge({ devtool: 'cheap-module-source-map' });

        config.entry('index')
            .add('webpack/hot/dev-server.js')
            .add('webpack-dev-server/client/index.js?hot=true&live-reload=true')

        config.watch(true)

        config.plugin('hmr').use(webpack.HotModuleReplacementPlugin).end()
    })

    // when prod
    config.when(process.env.NODE_ENV === 'production', config => {
        if (options.minimize) {
            config.optimization.minimize(true)
            config.optimization.minimizer('terser')
                .use(TerserPlugin)
        }

    })

    /**
     * @description entry
     * [https://webpack.js.org/configuration/entry-context/#entry]
     */
    config.entry('index')
        .add(path.resolve(process.cwd(), 'src/index.tsx'))

    /**
     * @description output
     * [https://webpack.js.org/configuration/output/]
     */
    config.output
        .publicPath('/')
        .set('clean', true)
        .filename('[name].[fullhash].js')
        .chunkFilename('[name].[chunkhash].chunk.js')
        .path(path.resolve(process.cwd(), 'dist'))

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

    /**
     * @description plugin
     * [https://webpack.js.org/configuration/plugins/]
     */
    config.plugin('html').use(HtmlWebpackPlugin, [{ template: path.resolve(process.cwd(), 'index.html') }]).end()
        .plugin('friendly-error').use(FriendlyErrorsPlugin).end()

}