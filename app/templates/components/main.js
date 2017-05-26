/*
 * @Author: yourName
 * @Date: 2017-04-28 16:22:29
 * @Last Modified by: zengyanling
 * @Last Modified time: 2017-05-26 15:34:02
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Index from 'page/index/index';
import store from '../store';
import '../assets/scss/reset.scss';

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
    routes: [
        {
            path: '/index',
            component: Index,
        }, {
            path: '*',
            redirect: '/index',
        },
    ],
});

new Vue({
    el: '#app',
    router,
    render(createElement) {
        return createElement('router-view');
    },
});
