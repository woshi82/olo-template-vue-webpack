/*
 * @Author: zengyanling
 * @Date: 2017-04-21 13:51:06
 * @Last Modified by: zengyanling
 * @Last Modified time: 2017-05-04 09:42:48
 */

// handlebars-loader

var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var config = require('../config')
var output = config.dev.output;
module.exports = merge(baseWebpackConfig, {
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // 更多配置： https://github.com/jantimon/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: '!!handlebars-loader!index.hbs',
            favicon: 'assets/images/favicon.ico',
            files: {
                js: [`${output.path}${output.js}main.js`, `${output.path}${output.js}flexible.js`],
                css: `${output.path}${output.css}[name].css`,
                chunks: {
                    main: {
                        entry: `${output.path}${output.js}main.js`
                    },
                    flexible: {
                        entry: `${output.path}${output.js}flexible.js`
                    },
                }
            },
            inject: false
        }),
        new FriendlyErrorsPlugin()
    ]
});
