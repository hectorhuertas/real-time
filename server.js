const express = require('express');
const http = require('http');
const app = express();

const config = require('./config.js');
config.set(app, express);

const polls = {};

require('./routes.js')(app, polls);

const server = http.createServer(app).listen(config.port, function() {
  console.log('Listening on port ' + config.port);
});

const socketIo = require('socket.io');
const io = socketIo(server);
require('./sockets.js')(io, config, polls);

const moment = require('moment')
var bob = moment().format('LT')
console.log(bob);

var CronJob = require('cron').CronJob;
new CronJob('00 * * * * *', function() {
  console.log('LIMPIEZA');
}, null, true, 'America/Los_Angeles');
