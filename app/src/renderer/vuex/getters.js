export default {
    allScores(state) {
        // Do not mutate array and sort by score value
        return state.scores.concat().sort((scoreA, scoreB) => {
            return scoreB.score - scoreA.score;
        });
    },

    finishedGame(state) {
        return {
            finished: state.lastGame.finished,
            score: state.lastGame.score
        };
    },

    gameWon(state) {
        return state.gameWon;
    }
};
