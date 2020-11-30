import { Helpers } from '../utils/helpers';
import { constants } from '../config/constants';
import { UserEvent } from '../models/user-event';

export class MobileUserEventsObservable {
    constructor(socketService, roomName) {
        this.roomName = roomName;
        this.observers = [];
        this.canSendToServer = true;
        this._userKeyUp = this._userKeyUp.bind(this);
        this._userKeyDown = this._userKeyDown.bind(this);
        this.listenUserEvents();
        this.socketService = socketService;
    }

    fireEvent(event, thisObj) {
        const scope = thisObj || window;

        if (this.canSendToServer) {
            this.socketService.emit(event);
        }
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

    listenUserEvents() {
        const { UP, DOWN, LEFT, RIGHT, FIRE } = constants.CLICK_EVENTS;

        document.getElementById('button-up').addEventListener('pointerdown', () => this._userKeyDown(UP));
        document.getElementById('button-up').addEventListener('pointerup', () => this._userKeyUp(UP));
        document.getElementById('button-down').addEventListener('pointerdown', () => this._userKeyDown(DOWN));
        document.getElementById('button-down').addEventListener('pointerup', () => this._userKeyUp(DOWN));
        document.getElementById('button-left').addEventListener('pointerdown', () => this._userKeyDown(LEFT));
        document.getElementById('button-left').addEventListener('pointerup', () => this._userKeyUp(LEFT));
        document.getElementById('button-right').addEventListener('pointerdown', () => this._userKeyDown(RIGHT));
        document.getElementById('button-right').addEventListener('pointerup', () => this._userKeyUp(RIGHT));
        document.getElementById('fire-button').addEventListener('pointerdown', () => this._userKeyDown(FIRE));
        document.getElementById('fire-button').addEventListener('pointerup', () => this._userKeyUp(FIRE));
    }

    _userKeyDown(code) {
        this.fireEvent(new UserEvent(code, true, this.roomName));
    }

    _userKeyUp(code) {
        this.fireEvent(new UserEvent(code, false, this.roomName));
    }
}
