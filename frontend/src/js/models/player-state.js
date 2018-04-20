export class PlayerState {
    constructor(coordinates, direction) {
        this.coordinates = coordinates;
        this.direction = direction;
    }

    move({x, y}) {
        this.coordinates.x += x;
        this.coordinates.y += y;
    }
}
