import { config } from "./config/config";
import { UserEventsObservable } from "./logic/user-events-observable";
import { GameState } from "./models/game-state";
import { Controller } from "./controllers/controller";

window.onload = () => {
    setCanvasSize();
    subscribeToUserEvents();
};

function setCanvasSize() {
    const canvas = document.getElementById('canvas');
    canvas.width = config.CANVAS_SIZE;
    canvas.height = config.CANVAS_SIZE;
}

function subscribeToUserEvents() {
    const context = document.getElementById('canvas').getContext('2d');

    const observable = new UserEventsObservable();
    const gameState = new GameState();
    const controller = new Controller(observable, gameState, context);
}
