'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entry = { app: ['./src/Index.tsx'] };

const plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    }),
    new HtmlWebpackPlugin({
        template: 'src/index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module) {
            // this assumes your vendor imports exist in the node_modules directory
            return module.context && module.context.indexOf('node_modules') !== -1;
        }
    })
];

let cssLoader;

if (process.env.NODE_ENV === 'production') {
    const ExtractTextPlugin = require("extract-text-webpack-plugin");

    cssLoader = {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            use: 'css-loader'
        })
    };

    plugins.push(
        new ExtractTextPlugin('styles.[hash].css')
    );
} else {
    const WebpackNotifierPlugin = require('webpack-notifier');

    entry.app.unshift('webpack-hot-middleware/client');

    cssLoader = {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    };

    plugins.push(
        new WebpackNotifierPlugin(),
        new webpack.HotModuleReplacementPlugin()
    );
}

module.exports = {
    devtool: 'source-map',

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
        modules: [
            path.resolve('.'),
            "node_modules"
        ]
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                loader: 'tslint-loader',
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
                options: {
                    emitErrors: true,
                    failOnHint: true
                }
            },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: path.resolve(__dirname, 'node_modules')
            },
            cssLoader
        ]
    },

    entry,

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },

    plugins
};
