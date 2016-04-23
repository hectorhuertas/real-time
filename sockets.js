const pollManager = require('./lib/poll-manager');

function sockets(io, config){
  const polls = require('./lib/polls');

  io.on('connection', function(socket){
    console.log('Someone connected');

    socket.on('message', function (channel, msg) {
      pollManager.closeOutdated(io);

      if (channel === 'newPoll')   { pollManager.create(msg, socket); }
      if (channel === 'newVote')   { newVote(socket, msg); }
      if (channel === 'closePoll') { closePoll(io,msg); }
    });
  });

  function newVote(socket, msg){
    if (polls[msg.pollId].status !== 'closed') {
      polls[msg.pollId].options[msg.value]++;
      socket.emit('yourVote', msg.value);
      io.sockets.emit('pollResults', polls[msg.pollId]);
    }
  }

  function closePoll(io,msg){
    polls[msg].status = 'closed';
    io.sockets.emit('pollClosed', msg);
  }
}

module.exports = sockets;
