import { Renderer } from "../view/renderer";

export class Controller {
    constructor(observable, context, socketService) {
        this.observable = observable;
        this.renderer = new Renderer(context);
        this.socketService = socketService;
        this.isPlayerDead = false;
        this.listenSocketEvents();
    }

    listenSocketEvents() {
        this.socketService.subscribeToSocketEvents(eventJson => {
            const event = JSON.parse(eventJson);
            if (event.playersToDelete.map(p => p.id).indexOf(this.socketService.playerId) !== -1) {
                this.isPlayerDead = true;
            }
            this.renderer.render(event, this.isPlayerDead);
        });
    }
}
