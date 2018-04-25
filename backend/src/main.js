
const UserEventsObservable = require('./logic/user-events-observable');
const Controller = require('./controllers/controller');
const MainLoop = require('./logic/main-loop');
const constants = require('./config/constants');

class Main {
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
                        const observable = new UserEventsObservable(socket);
                        const controller = new Controller(observable, room.gameState);
                        mainLoop.addCallback(controller.handleMainTick.bind(controller));
                    });
                }
            });
        });
    }
}

module.exports = Main;
