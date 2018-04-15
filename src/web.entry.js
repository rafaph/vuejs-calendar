import Vue from 'vue';

import moment from 'moment-timezone';
import './style.scss';
import store from './store';
import App from './components/App.vue';


moment.tz.setDefault('America/Sao_Paulo');

Object.defineProperty(Vue.prototype, '$moment', {
    get() {
        return this.$root.moment;
    }
});

new Vue({
    el: '#app',
    components: {
        App
    },
    data: {
        moment
    },
    store
});
