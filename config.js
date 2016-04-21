module.exports = {
  host: process.env.NODE_ENV === 'production' ? 'https://real-time-hector.herokuapp.com/' : 'http://localhost:3000/',
  set: function(app, express){
    app.use(express.static('public'));
    app.set('view engine', 'ejs');
  },
  si:'s'
};
