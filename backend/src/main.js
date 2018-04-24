const GameState = require('./models/game-state');
const UserEventsObservable = require('./logic/user-events-observable');
const Controller = require('./controllers/controller');
const MainLoop = require('./logic/main-loop');

class Main {
    static start(io) {
        const gameState = new GameState();
        const mainLoop = new MainLoop(gameState, io);
        mainLoop.addCallback(gameState.handleBulletsMovement.bind(gameState));
        mainLoop.addCallback(gameState.removeOutOfScreenBullets.bind(gameState));
        mainLoop.addCallback(gameState.checkBulletsHitting.bind(gameState));
        mainLoop.addCallback(gameState.removeDeadPlayers.bind(gameState));
        mainLoop.addCallback(gameState.removeBrokenWalls.bind(gameState));

        io.on('connection', (socket) => {
            const observable = new UserEventsObservable(socket);
            const controller = new Controller(observable, gameState, socket, io);
            mainLoop.addCallback(controller.handleMainTick.bind(controller));
        });
    }
}

module.exports = Main;
