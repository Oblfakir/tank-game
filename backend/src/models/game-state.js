const config = require('../config/config');
const TerrainFactory = require('../utils/terrain-factory');

class GameState {
    constructor() {
        this.players = [];
        this.terrain = [];
        this.bullets = [];
        this.bulletsToDelete = [];
        this._createTerrain();
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

    handleBulletsMovement() {
        this.bullets.forEach(b => {
            const isInScreen = b.move();
            if (!isInScreen) {
                this.bulletsToDelete.push(b);
            }
        });
    }

    addBullet(bullet) {
        this.bullets.push(bullet);
    }

    removeOutOfScreenBullets() {
        this.bullets = this.bullets.filter(b => this.bulletsToDelete.indexOf(b) === -1);
        this.bulletsToDelete = [];
    }

    addPlayer(player) {
        this.players.push(player);
    }

    removePlayer(player) {
        this.players = this.players.filter(x => x !== player);
    }
}

module.exports = GameState;
