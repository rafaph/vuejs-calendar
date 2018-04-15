import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment-timezone';
import axios from 'axios';

Vue.use(Vuex);

moment.tz.setDefault('America/Sao_Paulo');

export default new Vuex.Store({
    state: {
        currentYear: 2018,
        currentMonth: 4,
        eventFormPosX: 0,
        eventFormPosY: 0,
        eventFormActive: false,
        events: [],
        eventFormDate: moment()
    },
    mutations: {
        setCurrentMonth(state, payload) {
            state.currentMonth = payload;
        },
        setCurrentYear(state, payload) {
            state.currentYear = payload;
        },
        eventFormPos(state, payload) {
            state.eventFormPosX = payload.x;
            state.eventFormPosY = payload.y;
        },
        eventFormActive(state, payload) {
            state.eventFormActive = payload;
        },
        addEvent(state, payload) {
            state.events.push(payload);
        },
        eventFormDate(state, payload) {
            state.eventFormDate = payload;
        }
    },
    actions: {
        addEvent(context, payload) {
            return new Promise((resolve, reject) => {
                const event = {
                    description: payload,
                    date: context.state.eventFormDate
                };

                axios.post('/add_event', event).then(response => {
                    if (response.status === 200) {
                        context.commit('addEvent', event);
                        resolve();
                    } else {
                        reject();
                    }
                });
            });
        }
    }
});
