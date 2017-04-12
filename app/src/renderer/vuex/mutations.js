import * as types from './mutation-types';

export default {
    [types.SAVE_SCORE](state, score) {
        state.scores.push(score);
    },

    [types.TOGGLE_GAME](state, lastGame) {
        state.lastGame.finished = lastGame.finished;
        state.lastGame.score = lastGame.score;
    },

    [types.WIN_GAME](state, won) {
        state.gameWon = won;
    }
};
