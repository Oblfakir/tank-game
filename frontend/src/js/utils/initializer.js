import { TransportService } from "../services/transport-service";
import { config } from "../config/config";
import { constants } from '../config/constants';
import { Helpers } from "../utils/helpers";
import { Connection } from '../logic/connection';

export class Initializer {
    constructor() {
        this.roomsElement = document.getElementById('rooms');
        this.canvasContainerElement = document.getElementById('canvas-container');
        this.leaveRoomElement = document.getElementById('leave-room');
        this.roomsContainerElement = document.getElementById('rooms-container');
        this.canvas = document.getElementById('canvas');
        this.abortConnection = this.abortConnection.bind(this);
        this.createRoomHandler = this.createRoomHandler.bind(this);
        this.onRoomJoin = this.onRoomJoin.bind(this);
        document.getElementById('create-room').addEventListener('click', this.createRoomHandler);
    }

    async getConfig() {
        const configData = await TransportService.getConfig();
        const constantsData = await TransportService.getConstants();
        const configJson = await configData.json();
        const constantsJson = await constantsData.json();
        Object.assign(config, configJson);
        Object.assign(constants, constantsJson);
    }

    setCanvasSize() {
        this.canvas.width = config.CANVAS_SIZE;
        this.canvas.height = config.CANVAS_SIZE;
    }

    toggleVisibility() {
        this.roomsElement.classList.toggle('no-display');
        this.canvasContainerElement.classList.toggle('no-display');
        this.leaveRoomElement.classList.toggle('no-display');
    }

    async onRoomJoin(roomName) {
        await this.getConfig();
        this.setCanvasSize();
        this.toggleVisibility();
        this.connection = new Connection(roomName);
        this.leaveRoomElement.addEventListener('click', await this.abortConnection);
    }

    async abortConnection() {
        this.connection.abort();
        await this.loadRooms();
        this.toggleVisibility();
    }

    async createRoomHandler() {
        await TransportService.addRoom();
        await this.loadRooms();
    }

    async loadRooms() {
        while (this.roomsContainerElement.firstChild) {
            this.roomsContainerElement.removeChild(this.roomsContainerElement.firstChild);
        }

        const roomsData = await TransportService.getRooms();
        const roomsJson = await roomsData.json();

        Helpers.createRoomElementsByJSON(roomsJson, this.onRoomJoin).forEach(room => {
            this.roomsContainerElement.appendChild(room);
        });
    }
}
