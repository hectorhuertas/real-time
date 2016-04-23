const generateSecret = require('./generate-secret');

function slugify(text){
  return text.toString().toLowerCase().trim()
    .replace(/&/g, '-and-')
    .replace(/[\s\W-]+/g, '-');
}

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
