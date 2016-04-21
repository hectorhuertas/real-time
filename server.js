const express = require('express');
const http = require('http');
const app = express();

const config = require('./config.js');
config.set(app, express);

const polls = {};

require('./routes.js')(app, polls);

const server = http.createServer(app).listen(config.port, function() {
  console.log('Listening on port ' + config.port);
});

const socketIo = require('socket.io');
const io = socketIo(server);
const generateSecret = require('./lib/generate-secret');

io.on('connection', function(socket){
  console.log('someone connected');

  socket.on('message', function (channel, msg) {
    if (channel === 'newPoll') {
      const secret = generateSecret();
      addPoll(msg, secret);
      const newLinks = {
        admin: config.host + 'polls/' + slugify(msg.title) + '/admin/' + secret,
        voting: config.host + 'polls/' + slugify(msg.title)
      };
      socket.emit('newLinks', newLinks);
    } else if (channel === 'newVote') {
      if (polls[msg.pollId].status !== 'closed') {
        polls[msg.pollId].options[msg.value]++;
        socket.emit('yourVote', msg.value);
        io.sockets.emit('pollResults', polls[msg.pollId]);
      }
    } else if (channel === 'closePoll'){
      polls[msg].status = 'closed';
      io.sockets.emit('pollClosed', msg);
    }
    console.log(msg);
    // console.log(polls);
  });
});

function addPoll(poll, secret){
  polls[slugify(poll.title)] = {
    id: slugify(poll.title),
    title: poll.title,
    secret: secret,
    options: {
      [poll.one]: 0,
      [poll.two]: 0,
      [poll.three]: 0
    }
  };
}

function slugify(text){
  return text.toString().toLowerCase().trim()
    .replace(/&/g, '-and-')
    .replace(/[\s\W-]+/g, '-');
}
