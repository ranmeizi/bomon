import Config from 'webpack-chain'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

export default function (config: Config) {
    // tsx
    config.module
        .rule('react')
        .exclude.add(/node_modules/).end()
        .test(/\.tsx?$/)
        .use('babel-loader')
        .loader('babel-loader')
        .options({
            presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript"
            ],
            plugins: [
                ["@babel/plugin-proposal-decorators", { "legacy": true }]
            ]
        })

    // css
    config.module.rule('css')
        .test(/.css$/)
        .use('mini-css-extract-plugin-loader').loader(MiniCssExtractPlugin.loader).end()
        .use('css-loader').loader('css-loader').end()
        .use('postcss-loader').loader('postcss-loader')

    // less
    config.module.rule('less')
        .test(/.less$/)
        .use('mini-css-extract-plugin-loader').loader(MiniCssExtractPlugin.loader).end()
        .use('css-loader').loader('css-loader').end()
        .use('postcss-loader').loader('postcss-loader').end()
        .use('less-loader').loader('less-loader')


    /**
     * @description css-minimizer-webpack-plugin
     * [https://webpack.docschina.org/plugins/css-minimizer-webpack-plugin/]
     */
    config.plugin('css-minimizer-webpack-plugin').use(MiniCssExtractPlugin)
    config.optimization.minimizer('css-minimizer-webpack-plugin').use(CssMinimizerPlugin)


    // image
    config.module.rule('image')
        .test(/\.(png|svg|jpg|jpeg|gif|webp)$/)
        .use('url-loader')
        .loader('url-loader')
        .options({
            limig: 8192
        })

    // fomts
    config.module.rule('fonts')
        .test(/\.(woff|woff2|eot|ttf|otf)$/)
        .use('url-loader')
        .loader('url-loader')
}