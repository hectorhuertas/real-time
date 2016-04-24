var polls = require('./polls');

function authenticate(request){
  return request.params.secret === polls[request.params.id].secret;
}

module.exports = authenticate;
