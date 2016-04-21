const express = require('express');
const http = require('http');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
const polls = {};
polls['test-poll'] = {
  id: 'test-poll',
  title: 'Test Poll',
  secret: 'secret',
  options: {
    ['Yeah!']: 0,
    ['So so']: 0,
    ['No way']: 0
  }
};
// ROUTES

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html' );
});

app.get('/polls/:id', function(req, res){
  res.render('voting', {poll: polls[req.params.id]});
  console.log(polls);
});

app.get('/polls/:id/admin/:secret', function(req, res){
  const owner = req.params.secret === polls[req.params.id].secret;
  if (owner) {
    res.render('admin', {poll: polls[req.params.id]});
  } else {
    res.sendStatus(404);
  }
  console.log(polls);
});

// ROUTES END
const host = process.env.NODE_ENV === 'production' ? 'https://real-time-hector.herokuapp.com/' : 'http://localhost:3000/';
const port = process.env.PORT || 3000;
const server = http.createServer(app) .listen(port, function() {
  console.log('Listening on port ' + port);
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
        admin: host + 'polls/' + slugify(msg.title) + '/admin/' + secret,
        voting: host + 'polls/' + slugify(msg.title)
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
