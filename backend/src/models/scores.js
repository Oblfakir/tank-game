class Scores {
    constructor() {
        this.scores = [];
    }

    addPlayer(id) {
        this.scores.push({ id, score: 0 })
    }

    increaseScoreFor(id) {
        const scoreRow = this.scores.find(score => score.id === id);
        if (scoreRow) scoreRow.score++;
    }
}

module.exports = Scores;
