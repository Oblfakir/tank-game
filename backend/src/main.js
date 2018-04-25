const MainLoop = require('./logic/main-loop');
const constants = require('./config/constants');
const Connection = require('./models/connection');

class Main {
    constructor () {
        this.connections = [];
    }

    start(io, room) {
        const mainLoop = new MainLoop(room.gameState, io, room.name);
        mainLoop.addCallback(room.gameState.handleBulletsMovement.bind(room.gameState));
        mainLoop.addCallback(room.gameState.removeOutOfScreenBullets.bind(room.gameState));
        mainLoop.addCallback(room.gameState.checkBulletsHitting.bind(room.gameState));
        mainLoop.addCallback(room.gameState.removeDeadPlayers.bind(room.gameState));
        mainLoop.addCallback(room.gameState.removeBrokenWalls.bind(room.gameState));

        io.on('connection', (socket) => {
            socket.on(constants.socketJoinRoomActionName, roomName => {
                if (room.name === roomName) {
                    socket.join(roomName, () => {
                        const connection = new Connection(socket, room);
                        this.connections.push(connection);
                        mainLoop.addCallback(connection.tickHandler);
                    });
                }
            });
            socket.on(constants.socketLeaveRoomActionName, roomName => {
                if (room.name === roomName) {
                    socket.leave(roomName, () => {
                        const connection = this.connections.find(c => c.id === socket.id);
                        connection.abort();
                        mainLoop.removeCallback(connection.tickHandler);
                        this.connections.splice(this.connections.indexOf(connection), 1);
                    });
                }
            });
        });
    }
}

module.exports = Main;
