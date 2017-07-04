/*
 * @Author: yourName
 * @Date: 2017-04-28 16:20:38
 * @Last Modified by: zengyanling
 * @Last Modified time: 2017-05-04 09:50:04
 */
<template src="./index.html"></template>
<script type="text/javascript">
import Loading from 'component/loading/loading';

export default {
    data() {
        return {
            a: 11223311,
        };
    },
    components: {
        Loading,
    },
    mounted() {
        this.v();
    },
    methods: {
        v() {
            console.log('222222ww');
        },
    },
};
</script>
 <style lang="scss" src="./index.scss"></style>

