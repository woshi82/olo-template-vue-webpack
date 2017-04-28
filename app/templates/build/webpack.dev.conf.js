/*
 * @Author: zengyanling
 * @Date: 2017-04-21 13:51:06
 * @Last Modified by: zengyanling
 * @Last Modified time: 2017-04-26 21:22:12
 */

var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // 更多配置： https://github.com/jantimon/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            files: {
                js: ['output/main.js', 'output/flexible.js'],
                chunks: {
                    main: {
                        entry: 'output/main.js'
                    },
                    flexible: {
                        entry: 'output/flexible.js'
                    },
                }

            },
            inject: false
        }),
        new FriendlyErrorsPlugin()
    ]
});
