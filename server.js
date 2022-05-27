const express = require('express');
const {Server: HTTPServer} = require('http');
const {Server: IOServer} = require('socket.io');

const app = express();
const server = new HTTPServer(app);
const io = new IOServer(server);
const chat = [];

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
});

server.listen(8080, () => console.log('Server started on port 8080...'));

io.on('connection', socket => {
    console.log('Nuevo cliente conectado!');
    socket.emit('fullChat', chat);
    socket.on('newMessage', data => {
        chat.push(data);
        io.sockets.emit('showCurrentMessage', data);
    })
});