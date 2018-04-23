const PlayerState = require('../models/player-state');
const BulletState = require('../models/bullet-state');
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
        this.isPlayerFiring = false;
        this.canPlayerFire = true;

        this.player = new PlayerState({x: 100, y: 200}, constants.directions.up, config.player.lastId);
        this.gameState.addPlayer(this.player);
        this._listenEvents();
        this.runMainLoop();
    }

    runMainLoop() {
        setInterval(() => {
            this.gameState.removeOutOfScreenBullets();
            if (this.isPlayerMoving) this.player.move(this.currentDirection);
            if (this.isPlayerFiring) this._playerFireHandler();
            this.gameState.handleBulletsMovement();
            this.io.emit(constants.socketStateReceiveActionName, JSON.stringify(this.gameState));
        }, 1000 / 60);
    }

    _playerFireHandler() {
        if (this.canPlayerFire) {
            this.gameState.addBullet(new BulletState(this.player.coordinates,
                this.currentDirection, config.bullet.lastId++));
            this.canPlayerFire = false;
            setTimeout(() => {
                this.canPlayerFire = true;
            }, config.bullet.fireDelay);
        }
    }

    _listenEvents() {
        this.observable.subscribe((event) => {
            const direction = Helpers.getDirectionFromEvent(event);
            this.currentDirection = direction || this.currentDirection;
            const isFireEvent = !direction;
            this.isPlayerMoving = !isFireEvent ? event.status : false;
            this.isPlayerFiring = isFireEvent ? event.status : false;
        });
    }
}

module.exports = Controller;
