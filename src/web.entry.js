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

window.__INITIAL_STATE__.forEach(event => {
    event.date = moment(event.date);
    return event;
});

const events = window.__INITIAL_STATE__;

const initialState = Object.assign({}, store.state, {events});

store.replaceState(initialState);

new Vue({
    el: '#app',
    data: {
        moment
    },
    store,
    render(h) {
        return h(App);
    }
});
