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

    static checkBulletIsInside(bulletPos, playerPos) {
        const size = config.player.size / 2 - 3;
        const inX = bulletPos.x >= playerPos.x - size && bulletPos.x <= playerPos.x + size;
        const inY = bulletPos.y >= playerPos.y - size && bulletPos.y <= playerPos.y + size;
        return inX && inY;
    }

    static checkBoundariesForBullet({ x, y }) {
        return x > 0 && x < config.CANVAS_SIZE && y > 0 && y < config.CANVAS_SIZE;
    }

    static checkBoundaries({ x, y }) {
        const size = config.player.size / 2 - 3;
        return x > size && x < config.CANVAS_SIZE - size && y > size && y < config.CANVAS_SIZE - size;
    }

    static checkTerrainInDirection(player, terrainInDirection) {
        if (!terrainInDirection) return true;
        if (terrainInDirection.type === constants.terrainTypes.grass) return true;

        const size = config.player.size / 2;
        const { x, y } = player.coordinates;
        let { xMin, yMin, xMax, yMax } = terrainInDirection;

        if (player.direction === constants.directions.up ||
            player.direction === constants.directions.down) {
            const dy = Math.min(Math.abs(yMin - y), Math.abs(yMax - y));
            return dy > size;
        }

        if (player.direction === constants.directions.left ||
            player.direction === constants.directions.right) {
            const dx = Math.min(Math.abs(xMin - x), Math.abs(xMax - x));
            return dx > size;
        }
    }
}

module.exports = Helpers;
