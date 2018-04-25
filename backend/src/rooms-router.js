const express = require('express');
const router = express.Router();
const Rooms = require('./models/rooms');
const GameState = require('./models/game-state');
const rooms = new Rooms();
const Main = require('./main');

router.route('/')
    .get((req, res) => {
        res.send(JSON.stringify(rooms.getRooms()));
    })
    .post((req, res) => {
        const main = new Main();
        const gameState = new GameState();
        const room = rooms.addRoom(gameState);
        main.start(req.io, room);
        res.send('ok');
    });

module.exports = router;
