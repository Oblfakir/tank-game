const config = require('../config/config');
const constants = require('../config/constants');

class Helpers {
    static getDirectionFromEvent(event) {
        switch (event.name) {
            case constants.events.click.up:
                return constants.directions.up;
            case constants.events.click.down:
                return constants.directions.down;
            case constants.events.click.left:
                return constants.directions.left;
            case constants.events.click.right:
                return constants.directions.right;
        }
    }

    static getDeltaFromDirection(direction) {
        switch (direction) {
            case constants.directions.right:
                return { x: config.player.speed, y: 0 };
            case constants.directions.left:
                return { x: -config.player.speed, y: 0 };
            case constants.directions.up:
                return { x: 0, y: -config.player.speed };
            case constants.directions.down:
                return { x: 0, y: config.player.speed };
            default:
                return { x:0, y:0 }
        }
    }

    static checkBoundaries({x, y}) {
        return x > 0 && x < config.CANVAS_SIZE && y > 0 && y < config.CANVAS_SIZE;
    }
}

module.exports = Helpers;
