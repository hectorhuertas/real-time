const config = require('../config');

function generateLinks(poll) {
  return {
     admin: config.host + 'polls/' + poll.id + '/admin/' + poll.secret,
    voting: config.host + 'polls/' + poll.id
  };
}

module.exports = generateLinks;
