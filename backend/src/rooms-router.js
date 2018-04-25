const express = require('express');
const router = express.Router();
const Rooms = require('./models/rooms');

const rooms = new Rooms();
const Main = require('./main');

router.route('/')
    .get((req, res) => {
        res.send(JSON.stringify(rooms.getRooms()));
    })
    .post((req, res) => {
        const main = new Main();
        const roomName = rooms.addRoom();
        main.start(req.io, roomName);
        res.send('ok');
    });

module.exports = router;
