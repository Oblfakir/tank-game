import { ViewState } from '../models/view-state';

export class Renderer {
    constructor(gameState, context) {
        this.gameState = gameState;
        this.context = context;
        this.viewState = new ViewState(context);
    }

    render() {
        this.viewState.mapGameState(this.gameState);
        this.viewState.render();
    }
}
