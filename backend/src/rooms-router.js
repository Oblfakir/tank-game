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
        rooms.addRoom(new Main().start(req.io));
        res.send('ok');
    });

router.route(':name/join')
    .post((req, res) => {

    });

module.exports = router;
