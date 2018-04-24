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
                if (Helpers.checkBulletIsInside(b.coordinates, p.coordinates)) {
                    this.playersToDelete.push(p);
                    this.bulletsToDelete.push(b);
                }
            });
        });
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
        const { x, y } = player.coordinates;
        for (let i = 0; i < config.BLOCKS_COUNT; i++) {
            for (let j = 0; j < config.BLOCKS_COUNT; j++) {
                let { xMin, yMin, xMax, yMax } = this.terrain[i][j];
                if (x > xMin && y > yMin && x < xMax && y < yMax) {
                    switch (player.direction) {
                        case constants.directions.up:
                            if (this.terrain[i - 1] && this.terrain[i - 1][j]) {
                                return this.terrain[i - 1][j];
                            }
                            break;
                        case constants.directions.down:
                            if (this.terrain[i + 1] && this.terrain[i + 1][j]) {
                                return this.terrain[i + 1][j];
                            }
                            break;
                        case constants.directions.left:
                            if (this.terrain[i][j - 1]) {
                                return this.terrain[i][j - 1];
                            }
                            break;
                        case constants.directions.right:
                            if (this.terrain[i][j + 1]) {
                                return this.terrain[i][j + 1];
                            }
                            break;
                    }
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
    }
}

module.exports = GameState;
