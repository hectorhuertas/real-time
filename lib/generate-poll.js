const generateSecret = require('./generate-secret');
const slugify = require('./slugify');

function generatePoll(pollData) {
    return {
    id: slugify(pollData.title),
    title: pollData.title,
    secret: generateSecret(),
    deadline: pollData.deadline,
    options: pollData.options
  };
}

module.exports = generatePoll;
