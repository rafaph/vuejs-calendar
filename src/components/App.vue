<template>
    <div id="app">
        <div>
            <div id="header">
                <div>
                    <img src="../assets/logo.png">
                    <h1>Vue.js Calendar</h1>
                </div>
                <div>
                    <current-month/>
                </div>
            </div>
            <div id="day-bar">
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                <div>Sun</div>
            </div>
            <div id="calendar">
                <div v-for="(week, i) in weeks" :key="i" class="calendar-week">
                    <calendar-day v-for="(day, j) in week" :key="j" :day="day"/>
                </div>
            </div>
            <event-form/>
        </div>
    </div>
</template>

<script>
    import CalendarDay from './CalendarDay.vue';
    import CurrentMonth from './CurrentMonth.vue';
    import EventForm from './EventForm.vue';

    export default {
        components: {
            CalendarDay,
            CurrentMonth,
            EventForm
        },
        computed: {
            month() {
                return this.$store.state.currentMonth;
            },
            year() {
                return this.$store.state.currentYear;
            },
            days() {
                const SUNDAY = 0;
                const MONDAY = 1;

                const days = [];

                // Generating all days in current month
                let currentDay = this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D');
                do {
                    days.push(currentDay);
                    currentDay = this.$moment(currentDay).add(1, 'days');
                } while ((currentDay.month() + 1) === this.month);

                // Add previous days to start
                currentDay = this.$moment(days[0]);
                if (currentDay.day() !== MONDAY) {
                    do {
                        currentDay = this.$moment(currentDay).subtract(1, 'days');
                        days.unshift(currentDay);
                    } while (currentDay.day() !== MONDAY);
                }

                // Add folowing days to end
                currentDay = this.$moment(days[days.length - 1]);
                if (currentDay.day() !== SUNDAY) {
                    do {
                        currentDay = this.$moment(currentDay).add(1, 'days');
                        days.push(currentDay);
                    } while (currentDay.days() !== SUNDAY);
                }

                return days;
            },
            weeks() {
                const weeks = [];
                let week = [];

                for (let day of this.days) {
                    week.push(day);
                    if (week.length === 7) {
                        weeks.push(week);
                        week = [];
                    }
                }

                return weeks;
            }
        }
    };
</script>
