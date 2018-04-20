import { config } from '../config/config';
import { UserEvent } from '../models/user-event';
import { constants } from '../config/constants';

export class UserEventsObservable {
    constructor() {
        this.observers = [];
        this._listenUserEvents();
    }

    fireEvent(event, thisObj) {
        const scope = thisObj || window;
        this.observers.forEach(observer => {
            observer.call(scope, event);
        });
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(obsItem => obsItem !== observer);
    }

    _listenUserEvents() {
        document.addEventListener('keydown', (event) => {
            const userEvent = this._getUserEventObject(event.keyCode, true);
            if (userEvent) {
                this.fireEvent(userEvent);
            }
        });
        document.addEventListener('keyup', (event) => {
            const userEvent = this._getUserEventObject(event.keyCode, false);
            if (userEvent) {
                this.fireEvent(userEvent);
            }
        });
    }

    _getUserEventObject(keyCode, status) {
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
