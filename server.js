const express = require('express');
const http = require('http');
const app = express();

app.use(express.static('public'));

// ROUTES

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html' );
});

// ROUTES END

const port = process.env.PORT || 3000;
const server = http.createServer(app) .listen(port, function() {
  console.log('Listening on port ' + port);
});

const socketIo = require('socket.io');
const io = socketIo(server);

io.on('connection', function(){
  console.log('someone connected');
});
