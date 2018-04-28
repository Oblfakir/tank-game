const config = require('../config/config');
const Helpers = require('../utils/helpers');

class BulletState {
    constructor(player) {
        this.player = player;
        this.coordinates = player.coordinates;
        this.direction = player.direction;
    }

    move() {
        const speed = config.bullet.speed;
        const { x, y } = this.coordinates;
        const nextPosition = {
            x: x + this.direction.x * speed,
            y: y + this.direction.y * speed
        };
        const isInScreen = Helpers.checkBoundariesForBullet(nextPosition);
        if (isInScreen) {
            this.coordinates = nextPosition;
        }
        return isInScreen;
    }
}

module.exports = BulletState;
