var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var pg = require('pg');
var app = express();
var connection = require('../modules/connection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

module.exports = router;

app.get('/index', function(req, res) {


});

app.get('/table', function(req, res) {
  //load table for specific user
  //find user id ... fetch resources
  // res.render('users/table')
});

app.post('/table', function(req, res) {
  //add data to database
  // submit form
});
/**
 * a home page route
 */
  // app.get('/signup', function(req, res) {
  //     // any logic goes here
  //     res.render('users/signup')
  // });
  //
  // app.get('/login', function(req, res) {
  //     // any logic goes here
  //     res.render('users/login')
  // });
