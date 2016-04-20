const express = require('express');
const http = require('http');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'hbs');
const polls = {};
polls.prueba = {
  title: 'prueba',
  secret: 'sagds3w3wt',
  ['opt 1']: 0,
  ['opt 2']: 0,
  ['opt 3']: 0
};
// ROUTES

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html' );
});

app.get('/polls/:id', function(req, res){
  res.render('voting', {morton: polls[req.params.id]});
  console.log(polls);
});

app.get('/polls/:id/admin/:secret', function(req, res){
  const owner = req.params.secret === polls[req.params.id].secret;
  if (owner) {
    res.render('admin', {morton: polls[req.params.id]});
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
        admin: host + msg.title + '-' + secret + '.html',
        voting: host + 'admin.html'
      };
      socket.emit('newLinks', newLinks);
    }
    console.log(msg);
    console.log(polls);
  });
});

function addPoll(poll, secret){
  polls[poll.title] = {
    title: poll.title,
    secret: secret,
    [poll.one]: 0,
    [poll.two]: 0,
    [poll.three]: 0
  };
}
