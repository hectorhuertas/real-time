const assert = require('assert');
const request = require('request');
const app = require('../server');
var polls = require('../lib/polls');
const pollManager = require('../lib/poll-manager');

describe('Server', () => {

  before((done) => {
    this.port = 9876;

    this.server = app.listen(this.port, (err, result) => {
      if (err) { return done(err); }
      done();
    });

    this.request = request.defaults({
      baseUrl: 'http://localhost:9876/'
    });
    polls = {};
  });

  after(() => {
    this.server.close();
  });

  it('should exist', () => {
    assert(app);
  });

  describe('GET /', () => {
    it('should return a 200', (done) => {
      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        assert.equal(response.statusCode, 200);
        done();
      });
    });

    it('should have a body with the name of the application', (done) => {
      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes('Real Time'));
        done();
      });
    });

    it('should have a body with the poll form', (done) => {
      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes('Title:'));
        assert(response.body.includes('Options:'));
        assert(response.body.includes('Add Option'));
        assert(response.body.includes('Closing time:'));
        assert(response.body.includes('Start the Poll'));
        assert(response.body.includes('Poll Links'));
        done();
      });
    });

    it('should have a body with the poll title', (done) => {
      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes('Title:'));
        done();
      });
    });

    it('should have a body with the poll options', (done) => {
      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes('Options:'));
        assert(response.body.includes('Add Option'));
        done();
      });
    });

    it('should have a body with the poll closing time', (done) => {
      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes('Closing time:'));
        done();
      });
    });

    it('should have a body with the poll submit button', (done) => {
      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes('Start the Poll'));
        done();
      });
    });

    it('should have a body with the poll links', (done) => {
      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes('Poll Links'));
        done();
      });
    });
  });
});
