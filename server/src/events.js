function events(server) {
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
        console.log('new connection');
    });
}

module.exports = events;
