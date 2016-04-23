const pollManager = require('./lib/poll-manager');

function send(responses, io, socket){
  for (var i = 0; i < responses.length; i++) {
    // console.log(responses[i]);
    switch (responses[i].type) {
      case 'one': socket.emit(responses[i].channel, responses[i].msg);break;
      case 'two': console.log('yeah');
      // console.log('bob');
        break;
      default:

    }
  }
}

function sockets(io, config){
  const polls = require('./lib/polls');

  io.on('connection', function(socket){
    console.log('Someone connected');

    socket.on('message', function (channel, msg) {
      pollManager.closeOutdated(io);
      const responses = [];
      if (channel === 'newPoll')   {
        responses.push(pollManager.create(msg, socket));
      }
      if (channel === 'newVote')   { pollManager.newVote(msg, io, socket); }
      if (channel === 'closePoll') { pollManager.closePoll(msg, io); }
      // console.log(responses);
      send(responses, io, socket);
    });
  });
}

module.exports = sockets;
