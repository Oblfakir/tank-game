const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const config = require('./config/config');
const constants = require('./config/constants');
const cors = require('cors');

const GameState = require('./models/game-state');
const UserEventsObservable = require('./logic/user-events-observable');
const Controller = require('./controllers/controller');
const MainLoop = require('./logic/main-loop')

const PATHS = {
    static: __dirname + '/static'
};

app.use(cors());

app.use('/', express.static(PATHS.static));

app.get('/config', (req, res) => {
    res.send(JSON.stringify(config));
});

app.get('/constants', (req, res) => {
    res.send(JSON.stringify(constants));
});

const gameState = new GameState();
const mainLoop = new MainLoop(gameState, io);

io.on('connection', (socket) => {
    config.player.lastId++;
    const observable = new UserEventsObservable(socket);
    const controller = new Controller(observable, gameState, socket, io);
    mainLoop.addCallback(controller.handleMainTick.bind(controller));
});

http.listen(1234, () => {
    console.log('listening on *:1234');
});
