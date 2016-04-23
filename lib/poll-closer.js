const moment = require('moment');

function closePolls(polls,io){
  for(const poll in polls){
    if (polls[poll].deadline <= moment().unix()) {
      polls[poll].status = 'closed';
      io.sockets.emit('pollClosed', poll);
    }
  }
}

function pollCloser(polls, io) {
  const CronJob = require('cron').CronJob;
  new CronJob('* * * * * *', function() {
    closePolls(polls, io);
  }, null, true, 'America/Los_Angeles');
}

module.exports = pollCloser;
