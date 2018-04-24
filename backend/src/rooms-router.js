const express = require('express');
const router = express.Router();
const Rooms = require('./models/rooms');

const rooms = new Rooms();

router.route('/')
    .get(function (req, res) {
        res.send(rooms.getRooms());
    })
    .post(function (req, res) {
        rooms.addRoom();
        res.send('ok');
    });

module.exports = router;
