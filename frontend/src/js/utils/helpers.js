import { constants } from '../config/constants';
import { config } from '../config/config';
import { UserEvent } from '../models/user-event';

export class Helpers {
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

    static getUserEventObject(keyCode, status) {
        switch (keyCode) {
            case config.KEYS.up:
                return new UserEvent(constants.events.click.up, status);
            case config.KEYS.down:
                return new UserEvent(constants.events.click.down, status);
            case config.KEYS.left:
                return new UserEvent(constants.events.click.left, status);
            case config.KEYS.right:
                return new UserEvent(constants.events.click.right, status);
            case config.KEYS.fire:
                return new UserEvent(constants.events.click.fire, status);
        }
    }
}
