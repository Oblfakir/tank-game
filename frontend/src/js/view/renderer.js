import { ViewState } from '../models/view-state';
import { config } from '../config/config';

export class Renderer {
    constructor() {
        this.contextPlayers = document.getElementById('canvas-players').getContext('2d');
        this.contextTerrain = document.getElementById('canvas-terrain').getContext('2d');
        this.viewState = new ViewState(this.contextTerrain, this.contextPlayers);
        this.isInitiallyRendered = false;
    }

    render(gameState, isPlayerDead) {
        if (isPlayerDead) {
            this._showDeathScreen();
        } else {
            this._renderTerrain(gameState);
            this._renderPlayers(gameState);
        }
    }

    _renderTerrain(gameState) {
        if (gameState.barriersToDelete.length > 0 || !this.isInitiallyRendered ) {
            this.viewState.mapGameStateForTerrain(gameState);
            this.viewState.clearTerrainCanvas();
            this.viewState.renderTerrain();
            this.isInitiallyRendered = true;
        }
    }

    _renderPlayers(gameState) {
        this.viewState.mapGameStateForPlayers(gameState);
        this.viewState.clearPlayersCanvas();
        this.viewState.renderPlayers();
    }

    _showDeathScreen() {
        this.contextPlayers.fillStyle = "#000000";
        this.contextPlayers.fillRect(0, config.CANVAS_SIZE / 2 - 70, config.CANVAS_SIZE, 100);
        this.contextPlayers.fillStyle = "#FF0000";
        this.contextPlayers.font = "60px Optimus Princeps";
        this.contextPlayers.fillText("YOU DIED", config.CANVAS_SIZE / 2 - 150, config.CANVAS_SIZE / 2);
    }
}
