const polls = require('./polls');
const moment = require('moment');
const generateLinks = require('./generate-links');
const generatePoll = require('./generate-poll');

function isClosed(pollId) {
  return polls[pollId].status === 'closed';
}

function closeOutdated() {
  const responses = [];
  for(var pollId in polls){
    if (polls[pollId].deadline <= moment().utc().unix()) {
      responses.push(closePoll(pollId));
    }
  }
  return responses;
}

function newVote(msg){
  if (isClosed(msg.pollId)) { return {}; }

  polls[msg.pollId].options[msg.value]++;

  return [
    {type:'one', channel: 'yourVote',    msg: msg.value},
    {type:'all', channel: 'pollResults', msg: polls[msg.pollId]}
  ];
}

function closePoll(pollId){
  polls[pollId].status = 'closed';
  return {type:'all', channel: 'pollClosed', msg: pollId};
}

function newPoll(pollData) {
  const poll = generatePoll(pollData);
  polls[poll.id] = poll;
  const newLinks = generateLinks(poll);
  return {type:'one', channel: 'newLinks', msg: newLinks};
}

var pollManager = {
  newPoll: newPoll,
  newVote: newVote,
  closePoll: closePoll,
  closeOutdated: closeOutdated
};

module.exports = pollManager;
