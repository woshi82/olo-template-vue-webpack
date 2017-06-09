/*
 * @Author: zengyanling
 * @Date: 2017-04-23 22:46:46
 * @Last Modified by: zengyanling
 * @Last Modified time: 2017-06-09 18:17:45
 */

// vue-loader、babel-loader、 file-loader、 css-loader、sass-loader
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var px2rem = require('postcss-flexible');
var autoprefixer = require('autoprefixer');
var prodMode = (process.env.NODE_ENV).toLowerCase() === 'production';
var config = prodMode ? require('../config').prod : require('../config').dev;
var output = config.output;
var fileLoaderOpt = config.useRelativePath ? {
        useRelativePath: true,
        cssOutputPath: output.css,
        outputPath: output.img,
    } : {outputPath: output.img};
// var fileLoaderFontOpt = config.useRelativePath ? {
//         useRelativePath: true,
//         cssOutputPath: output.css,
//         outputPath: output.font,
//     } : {outputPath: output.font};
module.exports = {
    entry: {
        main: prodMode ? './components/main.js' : ['webpack-hot-middleware/client', './components/main.js'],
        flexible: './libs/flexible.js'
    },
    output: {
        path: path.resolve(output.path),
        filename: `${output.js}[name].js`,
        publicPath: output.publicPath || ''
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            page: path.resolve('components/page/'),
            component: path.resolve('components/component/'),
            scss: path.resolve('assets/scss/')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
                options: {
                    postcss: {
                        plugins: [
                            autoprefixer(),
                            px2rem({ remUnit: 75 }) // TODO: 根据设计图更改
                        ]
                    },
                    loaders: {
                        scss: prodMode ?
                            ExtractTextPlugin.extract({
                                use: ['css-loader', 'sass-loader',{
                                    loader: 'sass-loader',
                                    options: {
                                        sourceMap: prodMode,
                                        data: `@import "~${path.resolve('assets/scss/common.scss').replace(/\\/g, '/')}";`   // 兼容windows反斜杠被sass解析成编码字符串的问题
                                    }
                                }],
                                fallback: 'vue-style-loader'
                            }) :
                            ['vue-style-loader', 'css-loader', {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: prodMode,
                                    data: `@import "~${path.resolve('assets/scss/common.scss').replace(/\\/g, '/')}";`
                                }
                            }]
                    }
                }
            },
            {
                test: /(reset\.scss)$/,
                use: prodMode ?
                    ExtractTextPlugin.extract({
                        use: ['css-loader', {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: prodMode,
                                data: `@import "~${path.resolve('assets/scss/common.scss').replace(/\\/g, '/')}";`
                            },
                        }],
                    }) :
                    ['style-loader', 'css-loader', {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: prodMode,
                            data: `@import "~${path.resolve('assets/scss/common.scss').replace(/\\/g, '/')}";`
                        }
                    }]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                loader: 'file-loader',
                options: merge(fileLoaderOpt,{
                    limit: 10000,
                    name: '[name].[ext]'
                })
            },
            // {
            //     test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            //     loader: 'file-loader',
            //     options: merge(fileLoaderFontOpt,{
            //         limit: 10000,
            //         name: '[name].[ext]'
            //     })
            // }
        ]
    },
    plugins: [
    ]
};
