const express = require('express');
const http = require('http');
const app = express();

const config = require('./config.js');
config.set(app, express);

require('./routes.js')(app);

const server = http.createServer(app).listen(config.port, function() {
  console.log('Listening on port ' + config.port);
});

const socketIo = require('socket.io');
const io = socketIo(server);
require('./sockets.js')(io, config);
