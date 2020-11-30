import { MobileUserEventsObservable } from "./mobile-user-events-observable";
import { MobileSocketService } from "../services/mobile-socket-service";

export class MobileConnection {
    constructor(data) {
        this.data = data;
        this.roomName = data.roomName;
        this.connect();
    }

    connect() {
        this.socketService = new MobileSocketService();
        this.socketService.join(this.data);
        this.observable = new MobileUserEventsObservable(this.socketService, this.roomName);
    }

    abort() {
        this.socketService.leaveRoom(() => {
            delete this.observable;
            delete this.socketService;
        });
    }
}
