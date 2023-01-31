import WebpackDevServer from 'webpack-dev-server'
import path from 'path'
import { Options } from './type'

export default function (options: Options, compiler: any) {

    if (process.env.NODE_ENV === 'development') {
        const server = new WebpackDevServer({
            static: {
                directory: path.join(process.cwd(), 'public'),
            },
            compress: true,
            port: 8080,
            open: true
        }, compiler);

        server.startCallback(() => {
            console.log("Starting server on http://localhost:8080");
        });
    }

}