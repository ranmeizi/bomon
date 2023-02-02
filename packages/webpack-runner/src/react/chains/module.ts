import Config from 'webpack-chain'

export default function (config: Config) {
    // tsx
    config.module
        .rule('react')
        .test(/\.tsx?$/i)
        .use('babel-loader')
        .loader('babel-loader')
        .options({
            presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript"
            ]
        })

    // css
    config.module.rule('css')
        .test(/.css$/i)
        .use('style-loader').loader('style-loader').end()
        .use('css-loader').loader('css-loader').end()
        .use('postcss-loader').loader('postcss-loader')

    // less
    config.module.rule('less')
        .test(/.less$/i)
        .use('style-loader').loader('style-loader').end()
        .use('css-loader').loader('css-loader').end()
        .use('postcss-loader').loader('postcss-loader').end()
        .use('less-loader').loader('less-loader')

    // image
    config.module.rule('image')
        .test(/\.(png|svg|jpg|jpeg|gif|webp)$/i)
        .use('url-loader')
        .loader('url-loader')
        .options({
            limig: 8192
        })

    // fomts
    config.module.rule('fonts')
        .test(/\.(woff|woff2|eot|ttf|otf)$/i)
        .use('url-loader')
        .loader('url-loader')
}