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

    static checkBulletIsHittingPlayer(bulletPos, playerPos) {
        const size = config.player.size / 2 - 3;
        const inX = bulletPos.x >= playerPos.x - size && bulletPos.x <= playerPos.x + size;
        const inY = bulletPos.y >= playerPos.y - size && bulletPos.y <= playerPos.y + size;
        return inX && inY;
    }

    static checkBulletIsHittingBarrier(bulletPos, barrier) {
        const inX = bulletPos.x >= barrier.xMin && bulletPos.x <= barrier.xMax;
        const inY = bulletPos.y >= barrier.yMin && bulletPos.y <= barrier.yMax;
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
            return Math.min(Math.abs(yMin - y), Math.abs(yMax - y)) > size + config.player.speed;
        }

        if (player.direction === constants.directions.left ||
            player.direction === constants.directions.right) {
            return Math.min(Math.abs(xMin - x), Math.abs(xMax - x)) > size;
        }
    }

    static getPlayerFrontPoints({ x, y }, direction) {
        const size = config.player.size / 2 - 3;
        const nextPosition = {
            x: x + direction.x * config.player.speed,
            y: y + direction.y * config.player.speed
        };

        switch (direction) {
            case constants.directions.up:
                return {
                    d1: { x: nextPosition.x + size, y: nextPosition.y - size},
                    d2: { x: nextPosition.x - size, y: nextPosition.y - size}
                };
            case constants.directions.down:
                return {
                    d1: { x: nextPosition.x + size, y: nextPosition.y + size},
                    d2: { x: nextPosition.x - size, y: nextPosition.y + size}
                };
            case constants.directions.left:
                return {
                    d1: { x: nextPosition.x + size, y: nextPosition.y + size},
                    d2: { x: nextPosition.x + size, y: nextPosition.y - size}
                };
            case constants.directions.right:
                return {
                    d1: { x: nextPosition.x - size, y: nextPosition.y + size},
                    d2: { x: nextPosition.x - size, y: nextPosition.y - size}
                };
        }
    }
}

module.exports = Helpers;
