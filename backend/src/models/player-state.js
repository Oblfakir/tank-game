class PlayerState {
    constructor(coordinates, direction, id) {
        this.id = id;
        this.coordinates = coordinates;
        this.direction = direction;
    }

    move({x, y}) {
        this.coordinates.x += x;
        this.coordinates.y += y;
    }
}

module.exports = PlayerState;
