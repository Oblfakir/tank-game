const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const config = require('./config/config');
const constants = require('./config/constants');
const cors = require('cors');

const GameState = require('./models/game-state');
const UserEventsObservable = require('./logic/user-events-observable');
const Controller = require('./controllers/controller');

const PATHS = {
    static: __dirname + '/static'
};

app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(PATHS.static + '/index.html');
});

app.get('/config', (req, res) => {
    res.send(JSON.stringify(config));
});

app.get('/constants', (req, res) => {
    res.send(JSON.stringify(constants));
});

const gameState = new GameState();

io.on('connection', (socket) => {
    config.player.lastId++;
    const observable = new UserEventsObservable(socket);
    const controller = new Controller(observable, gameState, socket, io);
});

http.listen(1234, () => {
    console.log('listening on *:1234');
});
