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
    }

    handleMainTick() {
        if (this.isPlayerMoving) this.player.move(this.currentDirection);
        if (this.isPlayerFiring) this._playerFireHandler();
    }

    _playerFireHandler() {
        if (this.canPlayerFire) {
            const bullet = new BulletState(this.player.coordinates,
                this.currentDirection, config.bullet.lastId++, this.player);
            this.gameState.addBullet(bullet);
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
