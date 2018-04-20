import { config } from './config/config';
import { UserEventsObservable } from './logic/user-events-observable';
import { Controller } from './controllers/controller';
import { TransportService } from './services/transport-service';
import { constants } from './config/constants';
import { SocketService } from "./services/socket-service";

window.onload = async () => {
    Object.assign(config, await getConfig());
    Object.assign(constants, await getConstants());
    setCanvasSize();
    subscribeToUserEvents();
};

async function getConfig() {
    const config = await TransportService.getConfig();
    return await config.json()
}

async function getConstants() {
    const constants = await TransportService.getConstants();
    return await constants.json()
}

function setCanvasSize() {
    const canvas = document.getElementById('canvas');
    canvas.width = config.CANVAS_SIZE;
    canvas.height = config.CANVAS_SIZE;
}

function subscribeToUserEvents() {
    const context = document.getElementById('canvas').getContext('2d');
    const socketService = new SocketService();
    const observable = new UserEventsObservable(socketService);
    const controller = new Controller(observable, context, socketService);
}
