const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const config = require('./config/config');
const constants = require('./config/constants');
const cors = require('cors');
const Main = require('./main');
const roomsRouter = require('./rooms-router');

const PATHS = {
    static: __dirname + '/static'
};

app.use(cors());

app.use('/rooms', roomsRouter);

app.use('/', express.static(PATHS.static));

app.get('/config', (req, res) => {
    res.send(JSON.stringify(config));
});

app.get('/constants', (req, res) => {
    res.send(JSON.stringify(constants));
});

Main.start(io);

const port = 1234;
http.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});
