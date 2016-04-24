var authenticate = require('./lib/authenticate');
var viewData = require('./lib/view-data');

function routes(app){
  app.get('/', function(req, res){
    res.render('index', viewData('index', 'Real Time'));
  });

  app.get('/polls/:id', function(req, res){
    res.render('voting', viewData('voting', 'Voting Page', req.params.id));
  });

  app.get('/polls/:id/admin/:secret', function(req, res){
    if (!authenticate(req)) { res.sendStatus(404); }

    res.render('admin', viewData('admin', 'Admin view', req.params.id));
  });
}

module.exports = routes;
