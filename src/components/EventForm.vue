<template>
    <div id="event-form" :class="{ active: active }" :style="{ top: top, left: left }">
        <h4>Add an event</h4>
        <p>{{ date.format('dddd, MMM Do') }}</p>
        <div class="text">
            <input v-focus v-model="description" type="text" placeholder="Dinner at Pancho's" @keyup.enter="create">
        </div>
        <div class="buttons">
            <button @click="create">Create</button>
        </div>
        <button id="close-button" @click="close">&#10005;</button>
    </div>
</template>

<script>
    export default {
        directives: {
            focus: {
                update(el) {
                    el.focus();
                }
            }
        },
        data() {
            return {
                description: ''
            };
        },
        computed: {
            top() {
                return `${this.$store.state.eventFormPosY}px`;
            },
            left() {
                return `${this.$store.state.eventFormPosX}px`;
            },
            active() {
                return this.$store.state.eventFormActive;
            },
            date() {
                return this.$store.state.eventFormDate;
            }
        },
        methods: {
            close() {
                this.$store.commit('eventFormActive', false);
            },
            create() {
                if (this.description.length > 0) {
                    this.$store.dispatch('addEvent', this.description).then(() => {
                        this.close();
                        this.description = '';
                    });
                }
            }
        }
    };
</script>
