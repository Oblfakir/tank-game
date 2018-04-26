import { ViewState } from '../models/view-state';
import { config } from '../config/config';

export class Renderer {
    constructor(context) {
        this.context = context;
        this.viewState = new ViewState(context);
    }

    render(gameState, isPlayerDead) {
        if (isPlayerDead) {
            this._showDeathScreen();
        } else {
            this.viewState.mapGameState(gameState);
            this.viewState.render();
        }
    }

    _showDeathScreen() {
        this.context.fillStyle = "#000000";
        this.context.fillRect(0, config.CANVAS_SIZE / 2 - 70, config.CANVAS_SIZE, 100);
        this.context.fillStyle = "#FF0000";
        this.context.font = "60px Optimus Princeps";
        this.context.fillText("YOU DIED", config.CANVAS_SIZE / 2 - 150, config.CANVAS_SIZE / 2);
    }
}
