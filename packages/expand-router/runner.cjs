const runner = require('@bomon/webpack-runner').runner

runner({
    type: 'react',
    chainWebpack(config) {

        // delete html plugin
        config.plugins.delete('html')

        // 改名
        config.output.filename('index.js')
        config.output.set('module', true)

        // 外部依赖
        config
            .externals({
                'react': 'react',
                'react-dom': 'react-dom',
                "react-router-dom": "react-router-dom"
            })
            .set('externalsType', 'module')

        config.set('experiments', {
            outputModule: true
        })

        // library
        config.output.libraryTarget('module')
    }
})