import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { webpackConfig } from './webpack.config';

const webpackProductionConfig: webpack.Configuration = {
    plugins: [
        ...webpackConfig.plugins,
        new CleanWebpackPlugin(),
    ],
}

export { webpackProductionConfig };