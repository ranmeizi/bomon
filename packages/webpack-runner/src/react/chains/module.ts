import Config from 'webpack-chain'

export default function (config: Config) {
    config.module
        .rule('react')
        .test(/\.tsx?$/)
        .use('babel')
        .loader('babel-loader')
        .options({
            presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript"
            ]
        }).end()
        .rule('css')
        .test(/.css/)
        .use('style')
        .loader('style-loader')
}