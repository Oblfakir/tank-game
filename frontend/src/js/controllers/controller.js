import { Renderer } from "../view/renderer";

export class Controller {
    constructor(observable, context, socketService) {
        this.observable = observable;
        this.renderer = new Renderer(context);
        this.socketService = socketService;
        this.listenSocketEvents();
    }

    listenSocketEvents() {
        this.socketService.subscribeToSocketEvents(gameState => {
            this.renderer.render(gameState);
        });
    }
}
