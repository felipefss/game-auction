const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = 3000;
const routes = require('./src/routes');

app.use(express.static('../client'));

app.use('/', routes);

// Listen for socket.io events
require('./src/events')(server);

server.listen(port, () => console.log(`Listening on port ${port}`));
// WARNING: app.listen(80) will NOT work here!
