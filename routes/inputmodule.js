var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var pg = require('pg');
var app = express();
var connection = require('../modules/connection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//router.post('/', function(req, res) {
//  console.log('in the module', req.body);
//  var addTransaction = {
//    date: req.body.date,
//    amount: req.body.amount
//  };
//  console.log('add transaction var', addTransaction);
//
//  pg.connect(connection, function(err, client, done) {
//    client.query('INSERT INTO transactions (dates, amount) VALUES ($1, $2)',
//        [addTransaction.date, addTransaction.amount],
//        function(err, result) {
//          done();
//          if (err) {
//            console.log("Error inserting data: ", err);
//            res.send(false);
//          } else {
//            res.send(result);
//          }
//    });
//  });
//});

//router.get('/', function(req, res) {
//    var results = [];  // create an empty array for results
//    pg.connect(connection, function(err, client, done) {
//        var query = client.query('SELECT * FROM transactions;');
//
//        query.on('row', function(row) { // add data to a row each time it repeats
//            results.push(row);
//        });
//
//        query.on('end', function() { // return the results array at the end then go back to the data factory
//            client.end();
//            return res.json(results);
//        });
//
//        if(err) {
//            console.log(err);
//        }
//    })
//});

module.exports = router;