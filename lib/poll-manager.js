const polls = require('./polls');
const moment = require('moment');
const generateLinks = require('./generate-links');
const generatePoll = require('./generate-poll');

function closeOutdated(io) {
  for(var poll in polls){
    if (polls[poll].deadline <= moment().utc().unix()) {
      polls[poll].status = 'closed';
      io.sockets.emit('pollClosed', poll);
    }
  }
}

function newVote(msg, io, socket){
  if (polls[msg.pollId].status !== 'closed') {
    polls[msg.pollId].options[msg.value]++;
    socket.emit('yourVote', msg.value);
    io.sockets.emit('pollResults', polls[msg.pollId]);
  }
}

function closePoll(msg, io){
  polls[msg].status = 'closed';
  io.sockets.emit('pollClosed', msg);
}

function create(pollData, socket) {
  const poll = generatePoll(pollData);
  polls[poll.id] = poll;
  const newLinks = generateLinks(poll);
  socket.emit('newLinks', newLinks);
}

var pollManager = {
  create: create,
  newVote: newVote,
  closePoll: closePoll,
  closeOutdated: closeOutdated
};

module.exports = pollManager;
