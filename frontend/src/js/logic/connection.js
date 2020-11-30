import { UserEventsObservable } from "./user-events-observable";
import { SocketService } from "../services/socket-service";
import { Controller } from "../controllers/controller";

export class Connection {
    constructor(roomName, callback) {
        this.roomName = roomName;
        this.callback = callback;
        this.connect();
    }

    connect() {
        this.socketService = new SocketService();
        this.socketService.joinRoom(this.roomName, this.callback);
        this.observable = new UserEventsObservable(this.socketService, this.roomName);
        this.controller = new Controller(this.observable, this.socketService);
    }

    abort() {
        this.socketService.leaveRoom(() => {
            delete this.controller;
            delete this.observable;
            delete this.socketService;
        });
    }
}
