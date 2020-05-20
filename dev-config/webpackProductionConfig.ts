import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const webpackProductionConfig: webpack.Configuration = {
    plugins: [
        new CleanWebpackPlugin(),
    ],
}

export { webpackProductionConfig };