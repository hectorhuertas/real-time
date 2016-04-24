const pollManager = require('./lib/poll-manager');
const flatten = require('./lib/flatten');

function send(responses, io, socket){
  const r = flatten(responses);

  for (var i = 0; i < r.length; i++) {
    switch (r[i].type) {
      case 'one':    socket .emit(r[i].channel, r[i].msg);break;
      case 'all': io.sockets.emit(r[i].channel, r[i].msg);break;
    }
  }
}

function sockets(io){
  io.on('connection', function(socket){
    console.log('Someone connected');

    socket.on('message', function (channel, msg) {
      const responses = [];
      responses.push(pollManager.closeOutdated());

      if (channel === 'newPoll')   {
        responses.push(pollManager.newPoll(msg)); }
      if (channel === 'newVote')   {
        responses.push(pollManager.newVote(msg)); }
      if (channel === 'closePoll') {
        responses.push(pollManager.closePoll(msg)); }

      send(responses, io, socket);
    });
  });
}

module.exports = sockets;
