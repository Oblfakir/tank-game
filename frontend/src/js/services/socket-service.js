import io from 'socket.io-client';
import { config } from '../config/config';
import { constants } from '../config/constants';

export class SocketService {
    joinRoom(roomName) {
        this.socket = io(config.host);
        this.roomName = roomName;
        this.socket.emit(constants.socketJoinRoomActionName, roomName);
        this.getPlayerId();
    }

    reconnectAfterDeath() {
        console.log(constants.socketReconnectAction);
        this.socket.emit(constants.socketReconnectAction, 'reconnect');
    }

    getPlayerId() {
        this.socket.on(constants.socketGetConnectionIdActionName, id => this.playerId = id);
    }

    leaveRoom(callback) {
        if (this.roomName) {
            this.socket.emit(constants.socketLeaveRoomActionName, this.roomName, callback);
        }
        this.roomName = undefined;
    }

    emit(event) {
        this.socket.emit(constants.socketUserActionName, event);
    }

    subscribeToSocketEvents(callback) {
        this.socket.on(constants.socketStateReceiveActionName, eventJSON => {
            callback(eventJSON);
        });
    }
}
