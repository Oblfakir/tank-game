const Helpers = require('../utils/helpers');

class BulletState {
    constructor(coordinates, direction, id, player) {
        this.id = id;
        this.player = player;
        this.coordinates = coordinates;
        this.direction = direction;
    }

    move() {
        const {x, y} = Helpers.getDeltaFromDirection(this.direction, 'for bullet');
        const nextPosition = {
            x: this.coordinates.x + x,
            y: this.coordinates.y + y
        };
        const isInScreen = Helpers.checkBoundariesForBullet(nextPosition);
        if (isInScreen) {
            this.coordinates = nextPosition;
        }
        return isInScreen;
    }
}

module.exports = BulletState;
