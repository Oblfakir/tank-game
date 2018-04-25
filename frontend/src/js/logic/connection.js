import { UserEventsObservable } from "./user-events-observable";
import { SocketService } from "../services/socket-service";
import { Controller } from "../controllers/controller";

export class Connection {
    constructor(roomName) {
        this.socketService = new SocketService();
        this.context = document.getElementById('canvas').getContext('2d');
        this.socketService.joinRoom(roomName);
        this.observable = new UserEventsObservable(this.socketService, roomName);
        this.controller = new Controller(this.observable, this.context, this.socketService);
    }

    abort() {
        this.socketService.leaveRoom(() => {
            delete this.controller;
            delete this.observable;
            delete this.socketService;
            delete this.context;
        });
    }
}
