/*
 * @Author: zengyanling
 * @Date: 2017-04-21 13:51:06
 * @Last Modified by: zengyanling
 * @Last Modified time: 2017-05-04 09:43:02
 */

// handlebars-loader

var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var config = require('../config');
process.env.NODE_ENV = config.prod.env.NODE_ENV;
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var output = config.prod.output;
module.exports = merge(baseWebpackConfig, {
    output: {
        filename: `${output.js}[name].js?[chunkhash]`
    },
    devtool: config.prod.productionSourceMap ? '#source-map' : false,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `"` + config.prod.env.NODE_ENV + `"`
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        new ExtractTextPlugin(`${output.css}[name].css?[contenthash]`),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
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
            inject: false,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // 更多配置： https://github.com/kangax/html-minifier#options-quick-reference
            },
            chunksSortMode: 'dependency'
        })
    ]
});
