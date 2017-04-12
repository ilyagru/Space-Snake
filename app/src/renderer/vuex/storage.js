const storage = window.localStorage;

export default {
    saveScore(score) {
        storage.setItem(score.date, JSON.stringify(score));
    },

    getScores() {
        let scores = [];

        for (let key in storage) {
            scores.push(JSON.parse(storage.getItem(key)));
        }

        return scores;
    }
};
