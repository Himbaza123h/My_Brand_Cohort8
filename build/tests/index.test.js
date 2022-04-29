"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var chai = require("chai");

var chaiHttp = require("chai-http");

var config = require("config");

var should = chai.should(); //to be used to test private routes

var token, articleId;

var mongoose = require("mongoose"); //During the test the env variable is set to test


process.env.NODE_ENV = 'test';

var _require = require("../models/Article"),
    Article = _require.Article;

var _require2 = require("../models/Query"),
    Query = _require2.Query;

var _require3 = require("../models/User"),
    User = _require3.User; //Require the dev-dependencies


var server = require('../index');

chai.use(chaiHttp); //Our parent block

describe('API', function () {
  var heading = "I have separated my interesting bussiness logic in pure javascript code but I can't find a way to test the routes that require a token in the headers of the http request.";
  before( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Article.deleteMany({
              heading: heading
            });

          case 2:
            _context.next = 4;
            return Query.deleteMany({
              username: 'Cook Indomie'
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  beforeEach(function (done) {
    //Before each test we empty the database
    User.deleteMany({
      email: 'Ronaldomessi@gmail.com'
    }, function (err) {
      //  console.log(config.get("DBHost"))
      done();
    });
  });
  afterEach(function (done) {
    // console.log(token);
    done();
  });
  describe("Login And Register", function () {
    it('should Register user, login user, generate a token upon login', function (done) {
      chai.request(server) // register request
      .post('/signup') // send user registration details
      .send({
        'email': 'Ronaldomessi@gmail.com',
        'password': 'Testertester'
      }).end(function (err, res) {
        // when we get a response from the endpoint
        //console.log(res.body)
        // the res object should have a status of 201
        res.should.have.status(201); // follow up with login

        chai.request(server).post('/login') // send user login details
        .send({
          'email': 'Ronaldomessi@gmail.com',
          'password': 'Testertester'
        }).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.have.property('token');
          token = res.body.token;
          done();
        });
      });
    });
    it('should not accept short password', function (done) {
      chai.request(server) // register request
      .post('/signup') // send user registration details
      .send({
        'email': 'Ronaldomessi@gmail.com',
        'password': 'tet'
      }).end(function (err, res) {
        // when we get a resonse from the endpoint
        res.should.have.status(400);
        done();
      });
    });
    it("Should not allow invalid credentials", function (done) {
      chai.request(server).post('/login') // send user login details
      .send({
        'username': 'Ronalsdfdo Chris',
        'password': 'sdfjlsdf'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('Message');
        done();
      });
    });
  });
  describe("Article", function () {
    describe("/POST articles", function () {
      it(' should POST an article ', function (done) {
        var query = {
          "heading": "I have separated my interesting bussiness logic in pure javascript code but I can't find a way to test the routes that require a token in the headers of the http request.",
          "content": "I have separated my interesting bussiness logic in pure javascript code but I can't find a way to test the routes that require a token in the headers of the http request.",
          "image": "This is a message from a good friend of yours"
        };
        chai.request(server).post('/article').send(query).set('Authorization', 'JWT ' + token) //token is actual token data
        .end(function (err, res) {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('Message').eql('New Article Created');
          done();
        });
      });
    });
    describe("/GET articles", function () {
      it(' should get all articles ', function (done) {
        chai.request(server).get('/article').set('Authorization', 'JWT ' + token) //token is actual token data
        .end(function (err, res) {
          articleId = res.body[0]["_id"];
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body[0].should.have.property('_id');
          res.body.length.should.not.be.eql(0);
          done();
        });
      });
      it(' should get a particular article article', function (done) {
        chai.request(server).get('/article/' + articleId).set('Authorization', 'JWT ' + token) //token is actual token data
        .end(function (err, res) {
          res.should.have.status(200);
          done();
        });
      });
    });
  });
  describe("Query", function () {
    describe("/POST query", function () {
      it(' should POST a query ', function (done) {
        var query = {
          "username": "Cook Indomie",
          "email": "cook@gmail.com",
          "subject": "This is a subject",
          "message": "This is a message from a good friend of yours"
        };
        chai.request(server).post('/query').send(query).set('Authorization', 'JWT ' + token) //token is actual token data
        .end(function (err, res) {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('Message').eql('New Query submitted successfully');
          done();
        });
      });
    });
    describe("/GET queries", function () {
      it(' should get queries ', function (done) {
        chai.request(server).get('/query').set('Authorization', 'JWT ' + token).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body[0].should.have.property('name');
          res.body[0].should.have.property('email');
          res.body[0].should.have.property('subject');
          res.body[0].should.have.property('message');
          done();
        });
      });
    });
  });
  describe("Likes", function () {
    var likeId;
    describe("/POST like", function () {
      it(' should POST a like ', function (done) {
        var like = {
          "articleId": articleId
        };
        chai.request(server).post('/like').send(like).set('Authorization', 'JWT ' + token) //token is actual token data
        .end(function (err, res) {
          res.body.should.have.property('Message');
          done();
        });
      });
    });
    describe('/GET Like', function () {
      it(' should GET all the likes', function (done) {
        chai.request(server).get('/like').end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.not.be.eql(0);
          likeId = res.body[0]["_id"];
          done();
        });
      });
    });
    describe('/GET like/:id', function () {
      it(' should GET a particular like', function (done) {
        chai.request(server).get('/like/' + likeId).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
      });
    });
  });
  describe("Comment", function () {
    var commentId;
    describe('/GET comment', function () {
      it(' should GET all the comments', function (done) {
        chai.request(server).get('/comment').end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.not.be.eql(0);
          commentId = res.body[0]["_id"];
          done();
        });
      });
    });
    describe("/POST comment", function () {
      it(' should POST a comment ', function (done) {
        var comment = {
          "articleId": articleId,
          "comment": "This is a test added during testing"
        };
        chai.request(server).post('/comment').send(comment).set('Authorization', 'JWT ' + token) //token is actual token data
        .end(function (err, res) {
          res.should.have.status(201);
          done();
        });
      });
    });
    describe('/GET comment/:id', function () {
      it(' should GET a particular comment', function (done) {
        chai.request(server).get('/comment/' + commentId).set('Authorization', 'JWT ' + token) //token is actual token data
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
      });
    });
  });
}); // describe("The first test",() =>{
//   it("Should Pass",() =>{
//       expect(true).to.equal(false);
//   })
// })
//# sourceMappingURL=index.test.js.map