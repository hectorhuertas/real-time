const moment = require('moment');
module.exports = function(io, config, polls){
  const generateSecret = require('./lib/generate-secret');

  io.on('connection', function(socket){
    console.log('someone connected');

    socket.on('message', function (channel, msg) {
      console.log(polls);
      console.log(moment().unix());
      console.log(moment().format('LTS'));
      closePolls(polls, io);
      if (channel === 'newPoll')   { newPoll(socket, msg); }
      if (channel === 'newVote')   { newVote(socket, msg); }
      if (channel === 'closePoll') { closePoll(io,msg); }
    });
  });

  function closePolls(polls,io){
    for(var poll in polls){
      if (polls[poll].deadline <= moment().utc().unix()) {
        polls[poll].status = 'closed';
        io.sockets.emit('pollClosed', poll);
      }
    }
  }

  function addPoll(poll, secret, deadline){
    polls[slugify(poll.title)] = {
      id: slugify(poll.title),
      title: poll.title,
      secret: secret,
      deadline: poll.deadline,
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

  function newPoll(socket, pollData){
    const secret = generateSecret();
    addPoll(pollData, secret);
    const newLinks = {
      admin: config.host + 'polls/' + slugify(pollData.title) + '/admin/' + secret,
      voting: config.host + 'polls/' + slugify(pollData.title)
    };
    socket.emit('newLinks', newLinks);
  }

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
};
