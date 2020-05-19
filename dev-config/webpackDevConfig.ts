import webpack from 'webpack';
import { webpackConfig } from './webpack.config';

const webpackDevConfig: webpack.Configuration = {
    watch: true,
    devtool: 'source-map',
    plugins: [
        { // just clear console before every compile
            apply(compiler) {
                // should-emit -> Called before emitting assets.
                // https://webpack.js.org/api/compiler-hooks/#shouldemit
                compiler.plugin('should-emit', compilation => {
                    console.log('\x1b[2J\x1b[0;0H');
                    return true;
                })
            }
        },
        ...webpackConfig.plugins,
    ],
}

export { webpackDevConfig };