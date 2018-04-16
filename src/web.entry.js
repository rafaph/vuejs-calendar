import moment from 'moment-timezone';
import VueCalendar from './entry';
import './style.scss';

moment.tz.setDefault('America/Sao_Paulo');

window.__INITIAL_STATE__.forEach(event => {
    event.date = moment(event.date);
    return event;
});

const events = window.__INITIAL_STATE__;

VueCalendar(events).$mount('#app');
