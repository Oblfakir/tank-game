import { TerrainView } from "../view/terrain-view";
import { PlayerView } from "../view/player-view";

export class ViewState {
    constructor(context) {
        this.context = context;
        this.players = [];
        this.terrain = [];
    }

    mapGameState(gameState) {
        this.terrain = gameState.terrain.map(tarr =>
            tarr.map(t => new TerrainView(t, this.context))
        );
        this.players = gameState.players.map(p => new PlayerView(p, this.context));
    }

    render() {
        this.terrain.forEach(tarr => tarr.forEach(t => t.render()));
        this.players.forEach(p => p.render());
    }
}
