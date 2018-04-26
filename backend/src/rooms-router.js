const express = require('express');
const router = express.Router();
const Rooms = require('./models/rooms');
const GameState = require('./models/game-state');
const rooms = new Rooms();
const StateHandler = require('./state-handler');

router.route('/')
    .get((req, res) => {
        res.send(JSON.stringify(rooms.getRooms()));
    })
    .post((req, res) => {
        createRoom(req.io);
        res.send('ok');
    });

function createRoom(io) {
    const stateHandler = new StateHandler();
    const gameState = new GameState();
    const room = rooms.addRoom(gameState);
    stateHandler.initialize(io, room);
}

module.exports = router;
