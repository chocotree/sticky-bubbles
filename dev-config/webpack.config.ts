import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

// locals
import { webpackDevConfig, webpackProductionConfig } from '../dev-config';

// clear console
console.log('\x1b[2J\x1b[0;0H');

const mode: any = process.argv[process.argv.indexOf('--mode') + 1];
process.env.NODE_ENV = mode;
const devMode = mode === 'development';


const webpackConfig: webpack.Configuration = {
    mode,
    entry: {
        main: './src/index.ts',
    },
    output: {
        filename: devMode ? '[name].js' : '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'build'),
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
            template: path.resolve(__dirname, 'src/index.html'),
            title: 'sticky bubbles',
        }),
    ]
};

// config for 🧪developemnt mode
mode === 'development' && Object.assign(webpackConfig, webpackDevConfig);

// config for 🧪production mode
mode === 'production' && Object.assign(webpackConfig, webpackProductionConfig);

export { webpackConfig };