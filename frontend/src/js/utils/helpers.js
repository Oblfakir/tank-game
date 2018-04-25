import { constants } from '../config/constants';
import { config } from '../config/config';
import { UserEvent } from '../models/user-event';

export class Helpers {
    static getUserEventObject(keyCode, status, roomName) {
        let event;
        switch (keyCode) {
            case config.KEYS.up:
                event = constants.events.click.up;
                break;
            case config.KEYS.down:
                event = constants.events.click.down;
                break;
            case config.KEYS.left:
                event = constants.events.click.left;
                break;
            case config.KEYS.right:
                event = constants.events.click.right;
                break;
            case config.KEYS.fire:
                event = constants.events.click.fire;
                break;
        }
        return new UserEvent(event, status, roomName);
    }

    static getAngleByDirection(direction) {
        switch (direction.name) {
            case constants.directions.up.name:
                return 0;
            case constants.directions.down.name:
                return Math.PI;
            case constants.directions.left.name:
                return -Math.PI / 2;
            case constants.directions.right.name:
                return Math.PI / 2;
        }
    }

    static createRoomElementsByJSON(roomsJson, roomJoinHandler) {
        const rooms = [];
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
            roomJoinButton.addEventListener('click', async () => {
                await roomJoinHandler(roomJoinButton.dataset.roomName);
            });
            roomElement.appendChild(roomName);
            roomElement.appendChild(roomJoinButton);
            rooms.push(roomElement);
        });
        return rooms;
    }
}
