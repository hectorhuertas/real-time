const polls = require('./polls');
const moment = require('moment');

function closeOutdated(io) {
  for(var poll in polls){
    if (polls[poll].deadline <= moment().utc().unix()) {
      polls[poll].status = 'closed';
      io.sockets.emit('pollClosed', poll);
    }
  }
}

var pollManager = {
  closeOutdated: closeOutdated
};

module.exports = pollManager;
