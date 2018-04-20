const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Express static', function () {

  it('GET request "/" should return the index page', function () {
    return chai.request(app)
      .get('/')
      .then(function (res) {
        expect(res).to.exist;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
  });

});

describe('404 handler', function () {

  it('should respond with 404 when given a bad path', function () {
    return chai.request(app)
      .get('/DOES/NOT/EXIST')
      .then(res => {
        expect(res).to.have.status(404);
      });
  });
});

describe('Notes route', function () {
  it('Get request to to api/notes should return all notes', function() {
    return chai.request(app)
      .get('/api/notes')
      .then( res => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.at.least(1);
      });
  });

  it('GET request to api/notes/id to return the correct note', () => {
    let id;
    return chai.request(app)
      .get('/api/notes')
      .then(res => {
        id = res.body[0].id;
        return chai.request(app)
          .get(`/api/notes/${id}`)
          .then( res => {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.a('object');
            expect(res.body).to.include.keys('id', 'title', 'content');
          });
      });
      
  });
  
});