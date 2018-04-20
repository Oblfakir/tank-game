import { Renderer } from "../view/renderer";
import { PlayerState } from "../models/player-state";
import { constants } from "../config/constants";
import { Helpers } from "../utils/helpers";

export class Controller {
    constructor(observable, gameState, context) {
        this.observable = observable;
        this.gameState = gameState;
        this.renderer = new Renderer(gameState, context);

        this.currentDirection = undefined;
        this.isPlayerMoving = false;

        this._initialize();
        this._listenEvents();
        this.runMainLoop();
    }

    runMainLoop() {
        this.interval = setInterval(() => {
            if (!this.isPlayerMoving) return;

            const player = this.gameState.players[0];
            const delta = Helpers.getDeltaFromDirection(this.currentDirection);
            const nextPosition = {
                x: player.coordinates.x + delta.x,
                y: player.coordinates.y + delta.y
            };
            if (!Helpers.checkBoundaries(nextPosition)) return;

            this.gameState.movePlayer(player, delta);
            this.renderer.render();
        }, 1000/60);
    }

    abortMainLoop() {
        window.clearInterval(this.interval);
    }

    _initialize( ) {
        const player = new PlayerState({x: 156, y: 342}, constants.directions.up);
        this.gameState.addPlayer(player);
        this.renderer.render();
    }

    _listenEvents() {
        this.observable.subscribe((event) => {
            if (event.status) {
                this.currentDirection = Helpers.getDirectionFromEvent(event);
                this.isPlayerMoving = true;
            } else {
                this.isPlayerMoving = false;
                this.currentDirection = undefined;
            }
        });
    }
}
