const pollManager = require('./lib/poll-manager');

function sockets(io, config){
  const polls = require('./lib/polls');

  io.on('connection', function(socket){
    console.log('Someone connected');

    socket.on('message', function (channel, msg) {
      pollManager.closeOutdated(io);

      if (channel === 'newPoll')   { pollManager.create(msg, socket); }
      if (channel === 'newVote')   { pollManager.newVote(msg, io, socket); }
      if (channel === 'closePoll') { pollManager.closePoll(msg, io); }
    });
  });
}

module.exports = sockets;
