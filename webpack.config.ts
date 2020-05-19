import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// need webpack.Configuration type
import webpack from 'webpack';

// clear console
console.log('\x1b[2J\x1b[0;0H');

const mode: any = process.argv[process.argv.indexOf('--mode') + 1];
process.env.NODE_ENV = mode;
const devMode = mode === 'development';


const config: webpack.Configuration = {
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

const devConfig: webpack.Configuration = {
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
        ...config.plugins,
    ],
}

const productionConfig: webpack.Configuration = {
    plugins: [
        ...config.plugins,
        new CleanWebpackPlugin(),
    ],
}

// config for 🧪developemnt mode
mode === 'development' && Object.assign(config, devConfig);

// config for 🧪production mode
mode === 'production' && Object.assign(config, productionConfig);

export { config };