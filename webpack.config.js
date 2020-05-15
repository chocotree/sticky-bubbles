const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

// clear console
console.log('\x1b[2J\x1b[0;0H');

const mode = process.argv[process.argv.indexOf('--mode') + 1];
process.env.NODE_ENV = mode;
const devMode = mode === 'development';

const config = {
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
mode === 'development' && Object.assign(config, {
    watch: true,
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        compress: true,
        port: 3001,
        hot: true,
    },
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
});

// config for 🧪production mode
mode === 'production' && Object.assign(config, {
    plugins: [
        ...config.plugins,
        new CleanWebpackPlugin(),
    ],
});

module.exports = config;