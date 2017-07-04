/*
 * @Author: yourName
 * @Date: 2017-04-28 16:20:38
 * @Last Modified by: zengyanling
 * @Last Modified time: 2017-05-04 09:50:25
 */

import Vue from 'vue';
import Vuex from 'vuex';
import account from './modules/account';
// import createLogger from '../../../src/plugins/logger';
Vue.use(Vuex);
// const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
    modules: {
        account,
    },
    strict: true,
    // plugins: debug ? [createLogger()] : []
});
