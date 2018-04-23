import { Helpers } from '../utils/helpers';

export class UserEventsObservable {
    constructor(socketService) {
        this.observers = [];
        this._listenUserEvents();
        this.socketService = socketService;
    }

    fireEvent(event, thisObj) {
        const scope = thisObj || window;
        this.socketService.emit(event);
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
            const userEvent = Helpers.getUserEventObject(event.keyCode, true);
            if (userEvent) {
                this.fireEvent(userEvent);
            }
        });
        document.addEventListener('keyup', (event) => {
            const userEvent = Helpers.getUserEventObject(event.keyCode, false);
            if (userEvent) {
                this.fireEvent(userEvent);
            }
        });
    }
}
