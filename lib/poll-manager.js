const polls = require('./polls');
const moment = require('moment');
const generateSecret = require('./generate-secret');
const config = require('../config');

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

function create(pollData, socket) {
  const secret = generateSecret();
  addPoll(pollData, secret);
  const newLinks = {
    admin: config.host + 'polls/' + slugify(pollData.title) + '/admin/' + secret,
    voting: config.host + 'polls/' + slugify(pollData.title)
  };
  socket.emit('newLinks', newLinks);
}

var pollManager = {
  create: create,
  newVote: newVote,
  closePoll: closePoll,
  closeOutdated: closeOutdated
};

module.exports = pollManager;
