const constants = require('../config/constants');

class MainLoop {
    constructor(gameState, io) {
        this.io = io;
        this.gameState = gameState;
        this.callbacks = [];
        this._run();
    }

    addCallback(callback) {
        this.callbacks.push(callback);
    }

    _run() {
        setInterval(() => {
            this.gameState.removeOutOfScreenBullets();
            this.callbacks.forEach(c => c());
            this.gameState.handleBulletsMovement();
            this.io.emit(constants.socketStateReceiveActionName, JSON.stringify(this.gameState));
        }, 1000 / 60);
    }
}

module.exports = MainLoop;
