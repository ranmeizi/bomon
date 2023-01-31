const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    entry: {
        index: [path.resolve(process.cwd(), 'src/index.tsx')]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '管理输出',
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].[fullhash].js',
        chunkFileName: '[name].[chunkhash].chunk.js',
    },
};

webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
        // ...
        console.error(stats?.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }))
        return
    }
    // Done processing
})