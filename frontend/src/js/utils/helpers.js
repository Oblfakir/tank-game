import { constants } from '../config/constants';
import { config } from '../config/config';
import { UserEvent } from '../models/user-event';

export class Helpers {
    static getUserEventObject(keyCode, status) {
        switch (keyCode) {
            case config.KEYS.up:
                return new UserEvent(constants.events.click.up, status);
            case config.KEYS.down:
                return new UserEvent(constants.events.click.down, status);
            case config.KEYS.left:
                return new UserEvent(constants.events.click.left, status);
            case config.KEYS.right:
                return new UserEvent(constants.events.click.right, status);
            case config.KEYS.fire:
                return new UserEvent(constants.events.click.fire, status);
        }
    }

    static getAngleByDirection(direction) {
        switch (direction.name) {
            case constants.directions.up.name:
                return 0;
            case constants.directions.down.name:
                return Math.PI;
            case constants.directions.left.name:
                return - Math.PI / 2;
            case constants.directions.right.name:
                return  Math.PI / 2;
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
