import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import dotenv from 'dotenv';

// locals
import { webpackDevConfig, webpackProductionConfig } from '../dev-config';
import { getCliArgs } from '../dev-utils';


// clear console
console.log('\x1b[2J\x1b[0;0H');

const mode: any = getCliArgs('--mode');
process.env.NODE_ENV = mode;
const devMode = mode === 'development';
const envPath = devMode ? 'dev-config/dev.env' : 'dev-config/production.env';

const webpackConfig: webpack.Configuration = {
    mode,
    entry: {
        main: path.resolve(__dirname, '../src/index.ts'),
    },
    output: {
        filename: devMode ? '[name].js' : '[name].[chunkhash].js',
        path: path.resolve(__dirname, '../build'),
    },
    module: {
        rules: [
            { // typescript
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            { // scss
                test: /\.s?[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: devMode,
                        },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[chunkhash].css'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            title: 'sticky bubbles',
        }),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(dotenv.config({ path: envPath }).parsed),
        })
    ]
};

// config for 🧪developemnt mode
mode === 'development' && Object.assign(webpackConfig, webpackDevConfig, {
    plugins: [...webpackConfig.plugins, ...webpackDevConfig.plugins],
});

// config for 🧪production mode
mode === 'production' && Object.assign(webpackConfig, webpackProductionConfig, {
    plugins: [...webpackConfig.plugins, ...webpackProductionConfig.plugins],
});

export default webpackConfig;