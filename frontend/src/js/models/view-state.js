import { TerrainView } from '../view/terrain-view';
import { PlayerView } from '../view/player-view';
import { BulletView } from '../view/bullet-view';
import { ImageSource } from "../utils/image-source";

export class ViewState {
    constructor(context) {
        this.context = context;
        this.imageSource = new ImageSource();
        this.players = [];
        this.terrain = [];
        this.bullets = [];
    }

    mapGameState(gameState) {
        this.terrain = gameState.terrain.map(tarr =>
            tarr.map(t => new TerrainView(t, this.context, this.imageSource))
        );
        this.players = gameState.players.map(p => new PlayerView(p, this.context));
        this.bullets = gameState.bullets.map(b => new BulletView(b, this.context));
    }

    render() {
        this.terrain.forEach(tarr => tarr.forEach(t => t.render()));
        this.players.forEach(p => p.render());
        this.bullets.forEach(b => b.render());
    }
}
