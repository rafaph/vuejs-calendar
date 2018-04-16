import Vue from 'vue';

import moment from 'moment-timezone';

import store from './store';
import App from './components/App.vue';

moment.tz.setDefault('America/Sao_Paulo');

Object.defineProperty(Vue.prototype, '$moment', {
    get() {
        return this.$root.moment;
    }
});


export default function (events) {
    const initialState = Object.assign({}, store.state, { events });

    store.replaceState(initialState);

    return new Vue({
        data: {
            moment
        },
        store,
        render(h) {
            return h(App);
        }
    });
}
