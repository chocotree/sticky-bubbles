const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

// locals
const webpackConfig = require('./webpack.config');
const { checkPort } = require('./dev-utils');

(async () => {
    let port = 3000;

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
    const devServerOptions = Object.assign({}, webpackConfig.devServer, {
        contentBase: path.resolve(__dirname, 'build'),
        compress: true,
        hot: true,
        open: true,
    })
    const server = new WebpackDevServer(compiler, devServerOptions);

    server.listen(port, '0.0.0.0', () => {
        console.log('starting server~');
    })
})();
