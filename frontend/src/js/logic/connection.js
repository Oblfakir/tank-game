import { UserEventsObservable } from "./user-events-observable";
import { SocketService } from "../services/socket-service";
import { Controller } from "../controllers/controller";

export class Connection {
    constructor(roomName) {
        this.roomName = roomName;
        this.connect();
    }

    connect() {
        this.socketService = new SocketService();
        this.socketService.joinRoom(this.roomName);
        this.context = document.getElementById('canvas').getContext('2d');
        this.observable = new UserEventsObservable(this.socketService, this.roomName);
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
