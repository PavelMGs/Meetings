const path = require('path');
const NODE_ENV = process.env.NODE_ENV;
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.ts', '.jsx', '.js', '.json', '.tsx'],
    },
    mode: NODE_ENV ? NODE_ENV : 'development',
    entry: path.resolve(__dirname, 'src/index.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000,
    },
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                exclude: [/node_modules/],
                use: 'ts-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-modules-typescript-loader?modules',
                    {
                        loader: 'css-loader',
                        options: {
  
                            modules: {
                                mode: 'local',
                                localIdentName: '[name]__[local]__[hash:base64:5]',
                                auto: /\.module.\w+$/i,
                            },
                        },
                    },
                    'sass-loader',
                ]
            },
            {
                test: [/\.jpg$/, /\.png$/, /\.pdf$/],
                use: 'url-loader'
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
        }),
    ],
    devServer: {
        port: 3000,
        open: true,
        hot: true,
    },
    devtool: 'source-map',
};