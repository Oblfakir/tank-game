const constants = require('../config/constants');
const config = require('../config/config');
const Helpers = require('../utils/helpers');

class PlayerState {
    constructor() {
        this.coordinates = config.player.initialCoordinates;
        this.direction = constants.directions.up;
    }

    move(direction, terrainInDirection) {
        this.direction = direction;
        const nextPosition = {
            x: this.coordinates.x + this.direction.x * config.player.speed,
            y: this.coordinates.y + this.direction.y * config.player.speed
        };
        if (Helpers.checkBoundaries(nextPosition) &&
            Helpers.checkTerrainInDirection(this, terrainInDirection)) {
            this.coordinates = nextPosition;
        }
    }
}

module.exports = PlayerState;
