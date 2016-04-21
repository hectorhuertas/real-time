function pollOwner(request, polls){
  return request.params.secret === polls[request.params.id].secret;
}

module.exports = function(app, polls){
  app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html' );
  });

  app.get('/polls/:id', function(req, res){
    res.render('voting', {poll: polls[req.params.id]});
  });

  app.get('/polls/:id/admin/:secret', function(req, res){
    if (pollOwner(req, polls)) {
      res.render('admin', {poll: polls[req.params.id]});
    } else {
      res.sendStatus(404);
    }
  });
};
