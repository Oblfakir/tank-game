const PlayerState = require('../models/player-state');
const constants = require('../config/constants');
const config = require('../config/config');
const Helpers = require('../utils/helpers');

class Controller {
    constructor(observable, gameState, socket, io) {
        this.socket = socket;
        this.io = io;
        this.observable = observable;
        this.gameState = gameState;

        this.currentDirection = undefined;
        this.isPlayerMoving = false;

        this.player = new PlayerState({x: 100, y: 200}, constants.directions.up, config.player.lastId);
        this.gameState.addPlayer(this.player);
        this._listenEvents();
        this.runMainLoop();
    }

    runMainLoop() {
        setInterval(() => {
            if (this.isPlayerMoving) {
                const delta = Helpers.getDeltaFromDirection(this.currentDirection);
                const nextPosition = {
                    x: this.player.coordinates.x + delta.x,
                    y: this.player.coordinates.y + delta.y
                };
                this.player.direction = this.currentDirection;
                if (Helpers.checkBoundaries(nextPosition)) {
                    this.gameState.movePlayer(this.player, delta);
                }
            }
            this.io.emit(constants.socketStateReceiveActionName, JSON.stringify(this.gameState));
        }, 1000 / 60);
    }

    _listenEvents() {
        this.observable.subscribe((event) => {
            this.currentDirection = Helpers.getDirectionFromEvent(event);
            this.isPlayerMoving = event.status;
        });
    }
}

module.exports = Controller;
