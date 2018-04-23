import { constants } from '../config/constants';
import { config } from '../config/config';
import { UserEvent } from '../models/user-event';

export class Helpers {
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

    static getAngleByDirection(direction) {
        switch (direction) {
            case constants.directions.up:
                return Math.PI / 2;
            case constants.directions.down:
                return -Math.PI / 2;
            case constants.directions.left:
                return 0;
            case constants.directions.right:
                return Math.PI;
        }
    }
}
