import { config } from './config/config';
import { UserEventsObservable } from './logic/user-events-observable';
import { Controller } from './controllers/controller';
import { TransportService } from './services/transport-service';
import { constants } from './config/constants';
import { SocketService } from "./services/socket-service";
import { Helpers } from "./utils/helpers";

window.onload = async () => {
    await loadRooms();
    document.querySelector('.create-room').addEventListener('click', async () => {
        await TransportService.addRoom();
        await loadRooms();
    });
};

async function onRoomJoin(roomName) {
    Object.assign(config, await getConfig());
    Object.assign(constants, await getConstants());
    setCanvasSize();
    initializeGame(roomName);
}

function initializeGame(roomName) {
    const context = document.getElementById('canvas').getContext('2d');
    const socketService = new SocketService(roomName);
    const observable = new UserEventsObservable(socketService, roomName);
    const controller = new Controller(observable, context, socketService);

    document.querySelector('.rooms').classList.toggle('no-display');
    document.querySelector('.canvas-container').classList.toggle('no-display');
}

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

async function loadRooms() {
    const roomsContainer = document.querySelector('.rooms-container');
    while (roomsContainer.firstChild) {
        roomsContainer.removeChild(roomsContainer.firstChild);
    }

    const roomsData = await TransportService.getRooms();
    const roomsJson = await roomsData.json();

    Helpers.createRoomElementsByJSON(roomsJson, onRoomJoin).forEach(room => {
        roomsContainer.appendChild(room);
    });
}
