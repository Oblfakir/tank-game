const constants = require('../config/constants');
const Helpers = require('../utils/helpers');
const Scores = require('./scores');

class GameState {
    constructor() {
        this.players = [];
        this.terrain = [];
        this.bullets = [];
        this.bulletsToDelete = [];
        this.playersToDelete = [];
        this.barriersToDelete = [];
        this.barriers = [];
        this.scores = new Scores();
        this._initializeTerrain();
    }

    handleBulletsMovement() {
        this.bullets.forEach(b => {
            const isInScreen = b.move();
            if (!isInScreen) this.bulletsToDelete.push(b);
        });
    }

    checkBulletsHitting() {
        this.barriersToDelete = [];
        this.bulletsToDelete = [];
        this.playersToDelete = [];

        this.bullets.forEach(b => {
            this.players.filter(x => x !== b.player).forEach(p => {
                if (Helpers.checkBulletIsHittingPlayer(b.coordinates, p.coordinates)) {
                    this.playersToDelete.push(p);
                    this.bulletsToDelete.push(b);
                    if (b.player) {
                        this.scores.increaseScoreFor(b.player.id);
                    }
                }
            });
            this.barriers.forEach(bar => {
                if (Helpers.checkBulletIsHittingBarrier(b.coordinates, bar)) {
                    this.barriersToDelete.push(bar);
                    this.bulletsToDelete.push(b);
                }
            });
        });
    }

    removeOutOfScreenBullets() {
        this.bullets = this.bullets.filter(b => this.bulletsToDelete.indexOf(b) === -1);
    }

    removeBrokenWalls() {
        this.barriersToDelete.forEach(b => {
            if (b.type === constants.terrainTypes.wall) {
                b.type = constants.terrainTypes.grass;
                this.barriers.splice(this.barriers.indexOf(b), 1);
            }
        });
    }

    removeDeadPlayers() {
        this.players = this.players.filter(p => this.playersToDelete.indexOf(p) === -1);
    }

    removePlayerIfExists(player) {
        const playerIndex = this.players.indexOf(player);
        if (playerIndex !== -1) this.players.splice(playerIndex, 1);
    }

    addBullet(bullet) {
        this.bullets.push(bullet);
    }

    addPlayer(player) {
        this.players.push(player);
        this.scores.addPlayer(player.id);
    }

    getTerrainInDirection(coordinates, direction) {
        const indexes = this._findTerrainByCoordinates(coordinates);
        if (!indexes) return;
        return this._getRelativeTerrain(indexes, direction);
    }

    getRandomGrassTerrain() {
        return Helpers.getRandomGrassTerrain(this.terrain);
    }

    _getRelativeTerrain({ i, j }, direction) {
        const { up, down, left, right } = constants.directions;
        switch (direction) {
            case up:
                if (!this.terrain[i - 1]) return;
                return this.terrain[i - 1][j];
            case down:
                if (!this.terrain[i + 1]) return;
                return this.terrain[i + 1][j];
            case left:
                return this.terrain[i][j - 1];
            case right:
                return this.terrain[i][j + 1];
        }
    }

    _findTerrainByCoordinates({ x, y }) {
        return Helpers.findTerrainByCoordinates({ x, y }, this.terrain);
    }

    _initializeTerrain() {
        const { terrain, barriers } = Helpers.createTerrain();
        this.terrain = terrain;
        this.barriers = barriers;
    }
}

module.exports = GameState;
