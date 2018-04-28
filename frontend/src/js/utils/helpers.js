import { constants } from '../config/constants';
import { config } from '../config/config';
import { UserEvent } from '../models/user-event';

export class Helpers {
    static getUserEventObject(keyCode, status, roomName) {
        const {up, down, left, right, fire } = constants.events.click;
        switch (keyCode) {
            case config.KEYS.up:
                return new UserEvent(up, status, roomName);
            case config.KEYS.down:
                return new UserEvent(down, status, roomName);
            case config.KEYS.left:
                return new UserEvent(left, status, roomName);
            case config.KEYS.right:
                return new UserEvent(right, status, roomName);
            case config.KEYS.fire:
                return new UserEvent(fire, status, roomName);
        }
    }

    static getAngleByDirection(direction) {
        const {up, down, left, right } = constants.directions;
        switch (direction.name) {
            case up.name:
                return 0;
            case down.name:
                return Math.PI;
            case left.name:
                return -Math.PI / 2;
            case right.name:
                return Math.PI / 2;
        }
    }

    static createRoomElementsByJSON(roomsJson, roomJoinHandler) {
        const rooms = [];
        roomsJson.forEach(room => {
            const roomElement = document.createElement('div');
            roomElement.classList.add('room');
            roomElement.dataset.roomName = room.name;
            const roomName = document.createElement('span');
            roomName.classList.add('room__name');
            roomName.textContent = room.name;
            const roomJoinButton = document.createElement('button');
            roomJoinButton.classList.add('room__join-button');
            roomJoinButton.textContent = 'Join';
            roomJoinButton.addEventListener('click', async () => {
                await roomJoinHandler(room.name);
            });
            const roomPlayers = document.createElement('span');
            roomPlayers.classList.add('room__players');
            roomPlayers.textContent = 'Players: 0';
            roomElement.appendChild(roomName);
            roomElement.appendChild(roomPlayers);
            roomElement.appendChild(roomJoinButton);
            rooms.push(roomElement);
        });
        return rooms;
    }
}
