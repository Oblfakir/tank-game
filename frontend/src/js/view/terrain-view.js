import { config } from '../config/config';
import { constants } from "../config/constants";

export class TerrainView {
    constructor(state, context) {
        this.state = state;
        this.context = context;
        this.width = config.CANVAS_SIZE / config.BLOCKS_COUNT;
    }

    render() {
        switch (this.state.type) {
            case constants.terrainTypes.earth:
                this.context.fillStyle = "#975F00";
                break;
            case constants.terrainTypes.grass:
                this.context.fillStyle = "#18AB01";
                break;
            case constants.terrainTypes.stone:
                this.context.fillStyle = "#CBC89C";
                break;
            case constants.terrainTypes.wall:
                this.context.fillStyle = "#8A2501";
                break;
        }
        let {x, y} = this.state.coordinates;
        this.context.fillRect(x, y, this.width, this.width);
    }
}
