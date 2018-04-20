import { config } from '../config/config';
import { TerrainFactory } from "../utils/terrain-factory";

export class GameState {
    constructor() {
        this.players = [];
        this.terrain = [];
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

    addPlayer(player) {
        this.players.push(player);
    }

    removePlayer(player) {
        this.players = this.players.filter(x => x !== player);
    }

    movePlayer(player, delta) {
        player.move(delta);
    }
}
