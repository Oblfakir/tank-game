import io from 'socket.io-client';
import { config } from '../config/config';
import { constants } from '../config/constants';

export class SocketService {
    constructor(roomName) {
        this.socket = io(config.host);
        this.socket.emit(constants.socketJoinRoomActionName, roomName);
    }

    emit(event) {
        this.socket.emit(constants.socketUserActionName, event);
    }

    subscribeToSocketEvents(callback) {
        this.socket.on(constants.socketStateReceiveActionName, function(gameStateJSON){
            const gameState = JSON.parse(gameStateJSON);
            callback(gameState);
        });
    }
}
