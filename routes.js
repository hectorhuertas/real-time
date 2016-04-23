var authenticate = require('./lib/authenticate');

function customize(name, title, poll) {
  return {
    viewName: name,
    viewTitle: title,
    poll: poll
  };
}

function routes(app, polls){
  app.get('/', function(req, res){
    res.render('index', {viewName: 'index', viewTitle: 'Real Time'});
  });

  app.get('/polls/:id', function(req, res){
    res.render('voting', customize('voting', 'Voting Page', polls[req.params.id]));
  });

  app.get('/polls/:id/admin/:secret', function(req, res){
    if (!authenticate(req, polls)) { res.sendStatus(404); }

    res.render('admin', customize('admin', 'Admin view', polls[req.params.id]));
  });
}

module.exports = routes;
