const storage = window.localStorage;

export default {
    saveScore(score) {
        storage.setItem(score.date, JSON.stringify(score));
    },

    getScores() {
        const scores = [];

        try {
            for (let key in storage) {
                scores.push(JSON.parse(storage.getItem(key)));
            }
        } catch (error) {
            console.warn('Probably localStorage has not only score objects. Delete non-JSON records in the localStorage to remove this warning.');
        }

        return scores;
    }
};
