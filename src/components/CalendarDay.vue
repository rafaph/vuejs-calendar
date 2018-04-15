<template>
    <div :class="classObject" @click="captureClick">
        {{ day.format('D') }}
        <ul class="event-list">
            <li v-for="event in events">{{ event.description }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            day: {
                type: Object,
                required: true
            }
        },
        computed: {
            events() {
                const data = this.$store.state.events;
                return data.filter(event => event.date.isSame(this.day, 'day'));
            },
            classObject() {
                const today = this.day.isSame(this.$moment(), 'day');
                const eventFormDate = this.$store.state.eventFormDate;
                const eventFormActive = this.$store.state.eventFormActive;
                return {
                    day: true,
                    today,
                    past: this.day.isSameOrBefore(this.$moment(), 'day') && !today,
                    active: eventFormDate.isSame(this.day, 'day') && eventFormActive
                };
            }
        },
        methods: {
            captureClick(event) {
                this.$store.commit('eventFormPos', {
                    x: event.clientX,
                    y: event.clientY
                });
                this.$store.commit('eventFormActive', true);
                this.$store.commit('eventFormDate', this.day);
            }
        }
    };
</script>
