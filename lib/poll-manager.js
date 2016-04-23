const polls = require('./polls');
const moment = require('moment');
const generateLinks = require('./generate-links');
const generatePoll = require('./generate-poll');

function closeOutdated(io) {
  for(var pollId in polls){
    if (polls[pollId].deadline <= moment().utc().unix()) {
      closePoll(pollId, io);
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

function closePoll(pollId, io){
  polls[pollId].status = 'closed';
  io.sockets.emit('pollClosed', pollId);
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
