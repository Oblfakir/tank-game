import { config } from '../config/config';
import { constants } from "../config/constants";

export class TerrainView {
    constructor(state, context, imageSource) {
        this.state = state;
        this.context = context;
        this.imageSource = imageSource;
        this.width = config.CANVAS_SIZE / config.BLOCKS_COUNT;
    }

    render() {
        let { x, y } = this.state.coordinates;
        x += this.width / 2;
        y += this.width / 2;
        this.context.translate(x, y);
        switch (this.state.type) {
            case constants.terrainTypes.grass:
                this.context.drawImage(this.imageSource.grassImg, -this.width / 2, -this.width / 2,
                    this.width, this.width);
                break;
            case constants.terrainTypes.stone:
                this.context.drawImage(this.imageSource.stoneImg, -this.width / 2, -this.width / 2,
                    this.width, this.width);
                break;
            case constants.terrainTypes.wall:
                this.context.drawImage(this.imageSource.wallImg, -this.width / 2, -this.width / 2,
                    this.width, this.width);
                break;
        }
        this.context.translate(-x, -y);
    }
}
