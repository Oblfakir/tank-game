const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PATHS = {
    static: __dirname + '/static'
};

app.get('/', function(req, res){
    res.sendFile(PATHS.static + '/index.html');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

http.listen(1234, function(){
    console.log('listening on *:1234');
});
