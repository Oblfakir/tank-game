const constants = require('./config/constants');
const express = require('express');
const router = express.Router();
const Rooms = require('./models/rooms');
const GameState = require('./models/game-state');
const rooms = new Rooms();
const StateHandler = require('./logic/state-handler');
const CurrentPlayersSender = require('./logic/current-players-sender');

const currentPlayersSender = new CurrentPlayersSender();

router.route('/')
    .get((req, res) => {
        res.send(JSON.stringify(rooms.getRooms()));
        currentPlayersSender.startSending(req.io);
    })
    .post((req, res) => {
        createRoom(req.io);
        res.send('ok');
    });

function createRoom(io) {
    const gameState = new GameState();
    const room = rooms.addRoom(gameState);
    const stateHandler = new StateHandler();
    stateHandler.initialize(io, room);
    currentPlayersSender.addHandler(stateHandler);
}

module.exports = router;
