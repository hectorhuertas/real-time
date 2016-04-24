const generateSecret = require('./generate-secret');
const slugify = require('./slugify');

function generatePoll(pollData) {
    return {
    id: slugify(pollData.title),
    title: pollData.title,
    secret: generateSecret(),
    deadline: pollData.deadline,
    options: {
      [pollData.one]: 0,
      [pollData.two]: 0,
      [pollData.three]: 0
    }
  };
}

module.exports = generatePoll;
