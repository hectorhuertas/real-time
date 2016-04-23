var polls = require('./polls');

function viewData(name, title, pollId) {
  return {
    viewName: name,
    viewTitle: title,
    poll: polls[pollId]
  };
}

module.exports = viewData;
