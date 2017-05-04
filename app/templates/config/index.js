/*
 * @Author: zengyanling
 * @Date: 2017-04-25 21:57:04
 * @Last Modified by: zengyanling
 * @Last Modified time: 2017-05-04 09:43:21
 */

var path = require('path');
module.exports = {
    prod: {
        env: {
            NODE_ENV: 'production'
        },
        productionSourceMap: false,  // 是否加入source-map
        output: {
            path: 'output/',
            js: 'public/js/',
            css: 'public/css/',
            img: 'public/img/',
            publicPath: ''
        },
        useRelativePath: true  // 是否使用相对路径
    },
    dev: {
        env: {
            NODE_ENV: 'development'
        },
        port: 9000,
        autoOpenBrowser: false, // 是否自动打开浏览器窗口
        output: {
            path: 'output/',
            js: 'public/js/',
            css: 'public/css/',
            img: 'public/img/',
            publicPath: '/'
        }
    }
};
