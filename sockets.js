const pollManager = require('./lib/poll-manager');

function send(bob, io, socket){
  console.log(bob);
  var responses = bob.reduce(function(a, b) {
  return a.concat(b);
}, []);
  for (var i = 0; i < responses.length; i++) {
    switch (responses[i].type) {
      case 'one':    socket .emit(responses[i].channel, responses[i].msg);break;
      case 'all': io.sockets.emit(responses[i].channel, responses[i].msg);break;
    }
  }
}

function sockets(io, config){
  const polls = require('./lib/polls');

  io.on('connection', function(socket){
    console.log('Someone connected');

    socket.on('message', function (channel, msg) {
      const responses = [];
      responses.push(pollManager.closeOutdated(io));
      if (channel === 'newPoll')   {
        responses.push(pollManager.newPoll(msg, socket));
      }
      if (channel === 'newVote')   {
        responses.push(pollManager.newVote(msg, io, socket)); }
      if (channel === 'closePoll') {
        responses.push(pollManager.closePoll(msg, io));
       }
      send(responses, io, socket);
    });
  });
}

module.exports = sockets;
