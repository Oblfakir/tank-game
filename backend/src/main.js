const GameState = require('./models/game-state');
const UserEventsObservable = require('./logic/user-events-observable');
const Controller = require('./controllers/controller');
const MainLoop = require('./logic/main-loop');
const constants = require('./config/constants');

class Main {
    start(io, roomName) {
        const gameState = new GameState();
        const mainLoop = new MainLoop(gameState, io, roomName);
        mainLoop.addCallback(gameState.handleBulletsMovement.bind(gameState));
        mainLoop.addCallback(gameState.removeOutOfScreenBullets.bind(gameState));
        mainLoop.addCallback(gameState.checkBulletsHitting.bind(gameState));
        mainLoop.addCallback(gameState.removeDeadPlayers.bind(gameState));
        mainLoop.addCallback(gameState.removeBrokenWalls.bind(gameState));

        io.on('connection', (socket) => {
            socket.on(constants.socketJoinRoomActionName, (room) => {
                socket.join(room);
            });
            const observable = new UserEventsObservable(socket);
            const controller = new Controller(observable, gameState);
            mainLoop.addCallback(controller.handleMainTick.bind(controller));
        });
    }
}

module.exports = Main;
