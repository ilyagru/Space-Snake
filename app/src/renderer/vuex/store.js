import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import storage from './storage';

Vue.use(Vuex);

const state = {
    scores: storage.getScores(),
    lastGame: {
        finished: false,
        score: 0
    },
    gameWon: false
};

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations,
    strict: process.env.NODE_ENV !== 'production'
});
