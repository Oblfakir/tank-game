import io from 'socket.io-client';
import { config } from '../config/config';
import { constants } from '../config/constants';

export class MobileSocketService {
    join(data) {
        this.data = data;
        this.socket = io(config.host);
        this.roomName = data.roomName;
        this.socket.emit(constants.SOCKET_MOBILE_JOIN_ROOM_ACTION_NAME, JSON.stringify(data));
    }

    leaveRoom(callback) {
        if (this.roomName) {
            this.socket.emit(constants.SOCKET_MOBILE_LEAVE_ROOM_ACTION_NAME, JSON.stringify(this.data), callback);
        }
        this.roomName = undefined;
    }

    emit(event) {
        this.socket.emit(constants.SOCKET_USER_ACTION_NAME, event);
    }
}
