import * as types from './mutation-types';

import storage from './storage';

export default {
    SAVE_SCORE({ commit }, score) {
        storage.saveScore(score);
        commit(types.SAVE_SCORE, score);
    },

    TOGGLE_GAME({ commit }, lastGame) {
        commit(types.TOGGLE_GAME, lastGame);
    },

    WIN_GAME({ commit }, won) {
        commit(types.WIN_GAME, won);
    }
};
