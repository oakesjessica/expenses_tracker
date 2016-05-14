// var express = require('express');
var router = require('express').Router();
// var bodyParser = require('body-parser');
// var path = require('path');
var pg = require('pg');
// var app = express();
var connection = require('../modules/connection');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// module.exports = router;

router.get('/', function(req, res) {

  pg.connect(connection, function(err, client, done) {

    if (err) {
      console.log("GET, pg connection !ERROR!", err);
      res.status(500).send(err);
    } else {
      client.query("SELECT users.first_name AS fname, users.last_name AS lname, user_categories.category AS cat, transactions.dates AS date, transactions.wherewhat AS ww, transactions.amount AS amount, transaction_type.type_name AS tn " +
      "FROM user_categories AS uc, transactions AS t, transaction_type as tt, users as u " +
      "WHERE uc.id = t.category_id AND t.t_type_id = tt.id AND u.id = uc.user_id " +
      "ORDER BY t.dates ASC;",function(err, result){
        if (err) {
          console.log("Retrieving data !ERROR!", err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          res.send(res.rows)
          console.log("get index");
          console.log(res.rows);
          }
        }
      )
    }

  }); //  pg.connect
});

// SELECT
//   users.first_name AS fname,
//   users.last_name AS lname,
//   user_categories.category AS cat,
//   transactions.dates AS date,
//   transactions.wherewhat AS ww,
//   transactions.amount AS amount,
//   transaction_type.type_name AS tn
// FROM
//   public.user_categories,
//   public.transactions,
//   public.transaction_type,
//   public.users
// WHERE
//   user_categories.id = transactions.category_id AND
//   transactions.t_type_id = transaction_type.id AND
//   users.id = user_categories.user_id
// ORDER BY
//   transactions.dates ASC;
