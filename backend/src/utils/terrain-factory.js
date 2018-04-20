const config = require('../config/config');
const TerrainState = require('../models/terrain-state');
const constants = require('../config/constants');

class TerrainFactory {
    constructor() {
        this.terrainWidth = config.CANVAS_SIZE / config.BLOCKS_COUNT;
    }

    getTerrain({i, j}, terrainType) {
        return new TerrainState({
                x: i * this.terrainWidth,
                y: j * this.terrainWidth },
            terrainType || TerrainFactory.getRandomType())
    }

    static getRandomType() {
        const arr = Object.keys(constants.terrainTypes);
        const n = Math.floor(Math.random() * Math.floor(arr.length));
        return constants.terrainTypes[arr[n]];
    }
}

module.exports = TerrainFactory;
