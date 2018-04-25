const PlayerState = require('../models/player-state');
const BulletState = require('../models/bullet-state');
const config = require('../config/config');
const Helpers = require('../utils/helpers');

class Controller {
    constructor(observable, gameState) {
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
            const {d1, d2} = Helpers.getPlayerFrontPoints(this.player.coordinates, this.currentDirection);
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
