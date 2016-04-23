function pollOwner(request, polls){
  return request.params.secret === polls[request.params.id].secret;
}

module.exports = function(app, polls){
  app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html' );
  });

  app.get('/polls/:id', function(req, res){
    const viewData = {
      viewName: 'voting',
      title: 'Voting Page',
      poll: polls[req.params.id]
    };
    res.render('voting', viewData);
  });

  app.get('/polls/:id/admin/:secret', function(req, res){
    if (pollOwner(req, polls)) {
      res.render('admin', {viewName: 'admin', poll: polls[req.params.id], title: 'Admin View'});
    } else {
      res.sendStatus(404);
    }
  });
};
