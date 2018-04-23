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

    _createTerrain() {
        const terrainFactory = new TerrainFactory();
        for (let i = 0; i < config.BLOCKS_COUNT; i++) {
            const arr = [];
            for (let j = 0; j < config.BLOCKS_COUNT; j++) {
                arr.push(terrainFactory.getTerrain({i, j}));
            }
            this.terrain.push(arr);
        }
    }
}

module.exports = GameState;
