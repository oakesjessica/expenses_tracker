var router = require("express").express.Router();
var pg = require('pg');
var connection = require('../modules/connection');

router.get("/", function(req, res) {
  pg.connect(connection, function(err, client, done) {
  //
  }); //  pg.connect
}); //  router.get

router.post("/", function(req, res) {
  var userID = 1;
  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log("POST, pg connection !ERROR!", err);
      res.status(500).send(err);
    } else {
      client.query("INSERT INTO user_categories (category, user_id) " +
      "VALUES (LOWER($1), $2) " +
      "ON CONFLICT DO NOTHING;", [req.body.category, userID], function(err, result) {
        if(err) {
          console.log("Posting category !ERROR!", err);
          res.status(500).send(err);
          process.exit(1); //disconnect from db
        } else {
          client.query("SELECT tt.id AS tt_id, uc.id AS cat_id " +
          "FROM transaction_type AS tt, user_categories AS uc " +
          "WHERE tt.type_name = LOWER($1) AND uc.category = LOWER($2) AND uc.user_id = $3;", [req.body.type, req.body.category, userID], function(err, result) {
            if (err) {
              console.log("Selecting transaction type and category !ERROR!", err);
              res.status(500).send(err);
              process.exit(1);
            } else {
              client.query("INSERT INTO transactions (wherewhat, amount, user_id, category_id, t_type_id, dates) VALUES " +
              "($1, $2, $3, $4, $5, $6);", [req.body.wherewhat, req.body.amount, userID, req.body.result.rows[0], req.body.result.rows[1], req.body.date], function(err, result) {
                if (err) {
                  console.log("Inserting into transactions !ERROR!", err);
                  res.status(500).send(err);
                  process.exit(1);
                } else {
                  //  UPDATE TABLES HERE
                }
              }); //  client.query - INSERT INTO transactions
            }
          }); //  client.query - SELECT transaction type and category name
        }
      }); //  client.query - INSERT INTO categories
    }
  });
});
/**
  * This function will add the amount from
  * the totals and monthly amounts to the credit, debt, and loans table
*/
function addToTotAndMon(table, amount, userID) {
  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log("AddToTotAndMon, pg connection !ERROR!", err);
      res.status(500).send(err);
    } else {
      client.query("UPDATE $1 " +
      "SET total = total + $2, monthly = monthly + $2 " +
      "WHERE $1.user_id = $3;", [table, amount, userID], function(err, result) {
        if (err) {
          console.log("UPDATE " + table + " !ERROR!", err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          done();
        }
      }); //  client.query
    } //  else
  }); //  pg.connect
} //  AddToTotAndMon

/**
  * This function will subtract the amount from
  * the totals and monthly amounts from the credit, debt, and loans table
*/
function subFromTotAndMon(table, amount, userID) {
  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log("SubFromTotAndMon, pg connection !ERROR!", err);
      res.status(500).send(err);
    } else {
      client.query("UPDATE $1 " +
      "SET total = total - $2, monthly = monthly - $2 " +
      "WHERE $1.user_id = $3;", [table, amount, userID], function(err, result) {
        if (err) {
          console.log("UPDATE " + table + " !ERROR!", err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          done();
        }
      }); //  client.query
    } //  else
  }); //  pg.connect
} //  SubFromTotAndMon

/**
  * This function will add the amount to the
  * totals of cash, checking, or savings table
*/
function addToCashCheckSav(table, amount, userID) {
  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log("addToCashCheckSav, pg connection !ERROR!", err);
      res.status(500).send(err);
    } else {
      client.query("UPDATE $1 " +
      "SET $1 = $1 + $2 " +
      "WHERE $1.user_id = $3;", [table, amount, userID], function(err, result) {
        if (err) {
          console.log("UPDATE " + table + " !ERROR!", err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          done();
        }
      }); //  client.query
    } //  else
  }); //  pg.connect
} //  addToCashCheckSav

/**
  * This function will subtract the amount from
  * the totals of cash, checking, or savings table
*/
function subFromCashCheckSav(table, amount, userID) {
  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log("subFromCashCheckSav, pg connection !ERROR!", err);
      res.status(500).send(err);
    } else {
      client.query("UPDATE $1 " +
      "SET $1 = $1 - $2 " +
      "WHERE $1.user_id = $3;", [table, amount, userID], function(err, result) {
        if (err) {
          console.log("UPDATE " + table + " !ERROR!", err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          done();
        }
      }); //  client.query
    } //  else
  }); //  pg.connect
} //  subFromCashCheckSav


module.exports = router;
