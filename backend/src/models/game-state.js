const constants = require('../config/constants');
const config = require('../config/config');
const TerrainFactory = require('../utils/terrain-factory');
const Helpers = require('../utils/helpers');

class GameState {
    constructor() {
        this.players = [];
        this.terrain = [];
        this.bullets = [];
        this.bulletsToDelete = [];
        this.playersToDelete = [];
        this.barriersToDelete = [];
        this.barriers = [];
        this._createTerrain();
    }

    handleBulletsMovement() {
        this.bullets.forEach(b => {
            const isInScreen = b.move();
            if (!isInScreen) {
                this.bulletsToDelete.push(b);
            }
        });
    }

    removeOutOfScreenBullets() {
        this.bullets = this.bullets.filter(b => this.bulletsToDelete.indexOf(b) === -1);
        this.bulletsToDelete = [];
    }

    checkBulletsHitting() {
        this.bullets.forEach(b => {
            this.players.filter(x => x !== b.player).forEach(p => {
                if (Helpers.checkBulletIsHittingPlayer(b.coordinates, p.coordinates)) {
                    this.playersToDelete.push(p);
                    this.bulletsToDelete.push(b);
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

    removeBrokenWalls() {
        this.barriersToDelete.forEach(b => {
            if (b.type === constants.terrainTypes.wall) {
                b.type = constants.terrainTypes.grass;
                this.barriers.splice(this.barriers.indexOf(b), 1);
            }
        });
        this.barriersToDelete = [];
    }

    removeDeadPlayers() {
        this.players = this.players.filter(p => this.playersToDelete.indexOf(p) === -1);
        this.playersToDelete = [];
    }

    addBullet(bullet) {
        this.bullets.push(bullet);
    }

    addPlayer(player) {
        this.players.push(player);
    }

    getTerrainInDirection(player) {
        const indexes = this._findPlayerPositionTerrain(player.coordinates);
        return this._getRelativeTerrain(indexes, player.direction);
    }

    _getRelativeTerrain({i, j}, direction) {
        switch (direction) {
            case constants.directions.up:
                if (this.terrain[i - 1]) {
                    return this.terrain[i - 1][j];
                }
                break;
            case constants.directions.down:
                if (this.terrain[i + 1]) {
                    return this.terrain[i + 1][j];
                }
                break;
            case constants.directions.left:
                return this.terrain[i][j - 1];
            case constants.directions.right:
                return this.terrain[i][j + 1];
        }
    }

    _findPlayerPositionTerrain({x, y}) {
        for (let i = 0; i < config.BLOCKS_COUNT; i++) {
            for (let j = 0; j < config.BLOCKS_COUNT; j++) {
                let { xMin, yMin, xMax, yMax } = this.terrain[i][j];
                if (x >= xMin && y >= yMin && x <= xMax && y <= yMax) {
                    return { i, j };
                }
            }
        }
    }

    _createTerrain() {
        const terrainFactory = new TerrainFactory();
        for (let i = 0; i < config.BLOCKS_COUNT; i++) {
            const arr = [];
            for (let j = 0; j < config.BLOCKS_COUNT; j++) {
                arr.push(terrainFactory.getTerrain({ i, j }));
            }
            this.terrain.push(arr);
        }
        this.terrain[0][0] = terrainFactory.getTerrain({ i: 0, j: 0 }, constants.terrainTypes.grass);

        for (let i = 0; i < config.BLOCKS_COUNT; i++) {
            for (let j = 0; j < config.BLOCKS_COUNT; j++) {
                if (this.terrain[i][j].type !== constants.terrainTypes.grass) {
                    this.barriers.push(this.terrain[i][j]);
                }
            }
        }
    }
}

module.exports = GameState;
