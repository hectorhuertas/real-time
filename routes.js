module.exports = function(app, polls){
  app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html' );
  });

  app.get('/polls/:id', function(req, res){
    res.render('voting', {poll: polls[req.params.id]});
    console.log(polls);
  });

  app.get('/polls/:id/admin/:secret', function(req, res){
    const owner = req.params.secret === polls[req.params.id].secret;
    if (owner) {
      res.render('admin', {poll: polls[req.params.id]});
    } else {
      res.sendStatus(404);
    }
    console.log(polls);
  });
};
