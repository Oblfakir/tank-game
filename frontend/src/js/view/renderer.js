import { ViewState } from '../models/view-state';

export class Renderer {
    constructor(context) {
        this.context = context;
        this.viewState = new ViewState(context);
    }

    render(gameState) {
        this.viewState.mapGameState(gameState);
        this.viewState.render();
    }
}
