import './styles/styles.scss';

import io from 'socket.io-client';

const socket = io('http://localhost:1234');

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    socket.emit('chat message', document.getElementById('m').value);
    document.getElementById('m').value = "";
    return false;
});

socket.on('chat message', function(msg){
    const message = document.createElement('li');
    message.textContent = msg;
    document.getElementById('messages').appendChild(message);
});
