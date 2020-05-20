import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
// locals
import { webpackConfig } from '../dev-config';
import { checkPort, getLocalExternalIP } from '../dev-utils';

(async () => {
    let port = 3000;
    const sockHost = getLocalExternalIP();

    await checkPort(port).then(freePort => {
        port = freePort;
    })
        .catch(err => {
            console.log(err.message);
            process.exit();
        })

    // webpack-dev-server api example:
    // ⛳ https://github.com/webpack/webpack-dev-server/blob/master/examples/api/simple/server.js
    const compiler = webpack(webpackConfig);
    const devServerOptions = {
        contentBase: path.resolve(__dirname, 'build'),
        compress: true,
        hot: true,
        open: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        // if not specified sockHost, go browsing from other device will find out the socket url is wrong!.
        // and will show some cors problem in dev console.
        sockHost,
    };
    const webpackDevServer = new WebpackDevServer(compiler, devServerOptions);

    webpackDevServer.listen(port, '0.0.0.0', () => {
        console.log('starting server~');
    })
})();
