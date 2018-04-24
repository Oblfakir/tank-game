import { config } from './config/config';
import { UserEventsObservable } from './logic/user-events-observable';
import { Controller } from './controllers/controller';
import { TransportService } from './services/transport-service';
import { constants } from './config/constants';
import { SocketService } from "./services/socket-service";

window.onload = async () => {
    await loadRooms();
    document.querySelector('.create-room').addEventListener('click', async () => {
        await TransportService.addRoom();
        await loadRooms();
    });
};

async function getConfig() {
    const config = await TransportService.getConfig();
    return await config.json()
}

async function getConstants() {
    const constants = await TransportService.getConstants();
    return await constants.json()
}

async function onRoomJoin() {
    Object.assign(config, await getConfig());
    Object.assign(constants, await getConstants());
    setCanvasSize();
    subscribeToUserEvents();
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

async function loadRooms() {
    const roomsContainer = document.querySelector('.rooms-container');
    while (roomsContainer.firstChild) {
        roomsContainer.removeChild(roomsContainer.firstChild);
    }
    const rooms = [];
    const roomsData = await TransportService.getRooms();
    const roomsJson = await roomsData.json();

    console.log(roomsJson);

    roomsJson.forEach(room => {
        const roomElement = document.createElement('div');
        roomElement.classList.add('room');
        const roomName = document.createElement('span');
        roomName.classList.add('room__name');
        roomName.textContent = room.name;
        const roomJoinButton = document.createElement('button');
        roomJoinButton.classList.add('room__join-button');
        roomJoinButton.textContent = 'Join';
        roomJoinButton.dataset.roomName = room.name;
        roomElement.appendChild(roomName);
        roomElement.appendChild(roomJoinButton);
        rooms.push(roomElement);
    });

    rooms.forEach(room => {
        roomsContainer.appendChild(room);
    });
}
