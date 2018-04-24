const PlayerState = require('../models/player-state');
const BulletState = require('../models/bullet-state');
const config = require('../config/config');
const Helpers = require('../utils/helpers');
const constants = require("../config/constants");

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

        this.player = new PlayerState();
        this.gameState.addPlayer(this.player);
        this._listenEvents();
    }

    handleMainTick() {
        if (this.isPlayerMoving) {
            const size = config.player.size / 2 - 3;
            let d1;
            let d2;
            let { x, y } = this.player.coordinates;

            const nextPosition = {
                x: x + this.currentDirection.x * config.player.speed,
                y: y + this.currentDirection.y * config.player.speed
            };

            switch (this.currentDirection) {
                case constants.directions.up:
                    d1 = { x: nextPosition.x + size, y: nextPosition.y - size};
                    d2 = { x: nextPosition.x - size, y: nextPosition.y - size};
                    break;
                case constants.directions.down:
                    d1 = { x: nextPosition.x + size, y: nextPosition.y + size};
                    d2 = { x: nextPosition.x - size, y: nextPosition.y + size};
                    break;
                case constants.directions.left:
                    d1 = { x: nextPosition.x + size, y: nextPosition.y + size};
                    d2 = { x: nextPosition.x + size, y: nextPosition.y - size};
                    break;
                case constants.directions.right:
                    d1 = { x: nextPosition.x - size, y: nextPosition.y + size};
                    d2 = { x: nextPosition.x - size, y: nextPosition.y - size};
                    break;
            }

            this.player.move(this.currentDirection,
                this.gameState.getTerrainInDirection(d1, this.currentDirection),
                this.gameState.getTerrainInDirection(d2, this.currentDirection));
        }
        if (this.isPlayerFiring) this._playerFireHandler();
    }

    _playerFireHandler() {
        if (this.canPlayerFire) {
            this.gameState.addBullet(new BulletState(this.player));
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
            if (!direction) {
                this.isPlayerFiring = event.status;
                this.isPlayerMoving = false;
            } else {
                this.isPlayerFiring = false;
                this.isPlayerMoving = event.status;
            }
        });
    }
}

module.exports = Controller;
