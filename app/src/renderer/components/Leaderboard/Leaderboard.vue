<template>
    <transition name="fade">
        <div class="leaderboard align-center">
            <h1>Leaderboard</h1>

            <table v-if="scores.length > 0">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(scoreObj, index) in scores" :key="index">
                        <td>{{index + 1}}</td>
                        <td>{{formattedDate(scoreObj.date)}}</td>
                        <td>{{scoreObj.score}}</td>
                    </tr>
                </tbody>
            </table>

            <h2 v-else>No scores.<br>Let's play a few times!</h2>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'leaderboard',

        computed: {
            scores() {
                return this.$store.getters.allScores;
            }
        },

        methods: {
            formattedDate(dateString) {
                return new Date(dateString).toLocaleString();
            }
        }
    };
</script>

<style scoped lang="scss">
    .leaderboard {
        overflow: scroll;
        max-height: 550px;

        tbody {
            td:last-child {
                @include gradient-text($gradient-secondary);
                font-weight: 700;
            }
        }
    }
</style>
