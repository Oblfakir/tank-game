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

    static getDeltaFromDirection(direction, target) {
        let speed = 0;
        if (target === 'for player') {
            speed = config.player.speed;
        }
        if (target === 'for bullet') {
            speed = config.bullet.speed;
        }
        switch (direction) {
            case constants.directions.right:
                return { x: speed, y: 0 };
            case constants.directions.left:
                return { x: -speed, y: 0 };
            case constants.directions.up:
                return { x: 0, y: -speed };
            case constants.directions.down:
                return { x: 0, y: speed };
            default:
                return { x:0, y:0 }
        }
    }

    static checkBulletIsInside(bulletPos, playerPos) {
        const size = config.player.size / 2 - 3;
        const inX = bulletPos.x >= playerPos.x - size && bulletPos.x <= playerPos.x + size;
        const inY = bulletPos.y >= playerPos.y - size && bulletPos.y <= playerPos.y + size;
        return inX && inY;
    }

    static checkBoundariesForBullet({x, y}) {
        return x > 0 && x < config.CANVAS_SIZE && y > 0 && y < config.CANVAS_SIZE;
    }

    static checkBoundaries({x, y}) {
        const size = config.player.size / 2 - 3;
        return x > size && x < config.CANVAS_SIZE - size && y > size && y < config.CANVAS_SIZE - size;
    }
}

module.exports = Helpers;
