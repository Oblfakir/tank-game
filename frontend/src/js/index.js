import { config } from './config/config';
import { TransportService } from './services/transport-service';
import { constants } from './config/constants';
import { Helpers } from "./utils/helpers";
import { Connection } from './logic/connection';

let connection

window.onload = async () => {
    await loadRooms();
    document.getElementById('create-room').addEventListener('click', async () => {
        await TransportService.addRoom();
        await loadRooms();
    });
};

async function onRoomJoin(roomName) {
    Object.assign(config, await getConfig());
    Object.assign(constants, await getConstants());
    setCanvasSize();
    toggleVisibility();
    connection = new Connection(roomName);
    document.getElementById('leave-room').addEventListener('click', abortConnection);
}

function abortConnection() {
    connection.abort();
    toggleVisibility();
}

function toggleVisibility() {
    document.getElementById('rooms').classList.toggle('no-display');
    document.getElementById('canvas-container').classList.toggle('no-display');
    document.getElementById('leave-room').classList.toggle('no-display');
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
    const roomsContainer = document.getElementById('rooms-container');
    while (roomsContainer.firstChild) {
        roomsContainer.removeChild(roomsContainer.firstChild);
    }

    const roomsData = await TransportService.getRooms();
    const roomsJson = await roomsData.json();

    Helpers.createRoomElementsByJSON(roomsJson, onRoomJoin).forEach(room => {
        roomsContainer.appendChild(room);
    });
}
