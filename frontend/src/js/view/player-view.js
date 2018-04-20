export class PlayerView {
    constructor(state, context) {
        this.state = state;
        this.context = context;
    }

    render() {
        const { x, y } = this.state.coordinates;
        this.context.fillStyle = "#FF0000";
        this.context.beginPath();
        this.context.arc(x, y, 20, 0, 2 * Math.PI);
        this.context.fill();
    }
}
