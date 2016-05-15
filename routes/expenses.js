var router = require("express").Router();
var pg = require('pg');
var connection = require('../modules/connection');

router.get('/', function(req, res) {
  var userID = 1;
  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log("GET, pg connection !ERROR", err);
      res.statu(500).send(err);
    } else {
      client.query("SELECT t.id AS t_id, uc.id AS uc_id, tt.id AS tt_id, t.wherewhat AS location, t.amount, t.dates AS date, " +
      "uc.category, tt.type_name AS transactiontype, " +
      "savings.savings, cash.cash, checking.checking, debt.total AS debt " +
      "FROM cash, checking, credit, debt, loans, savings, transactions AS t " +
      "JOIN user_categories AS uc ON t.category_id = uc.id " +
      "JOIN transaction_type AS tt ON t.t_type_id = tt.id WHERE t.user_id = $1;", [userID], function(err, result) {
        if (err) {
          console.log("Retrieving data !ERROR!", err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          console.log("get index");
          console.log(result.rows);
          res.send(result.rows);
          done();
        }
      }); //client.query
    }
  }); //  pg.connect
});

/**
* Posting layout
* 1) Insert user's category into user_categories table
* 2) Select transaction type ID and user_categories ID
* 3) Insert into transactions with information and ID's (user, transaction type, category)
* 4) Update cash, checking, savings, debt, loans based on categories
*/

router.post("/", function(req, res) {
  var userID = 1;

  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log("POST, pg connection !ERROR!", err);
      res.status(500).send(err);
      proces.exit(1);
    } else {
      var reqCategory = req.body.category;
      var transactionType = req.body.transactionType;

      client.query("INSERT INTO user_categories (category, user_id) " +
      "VALUES (LOWER($1), $2) " +
      "ON CONFLICT DO NOTHING " +
      "RETURNING id;", [reqCategory, userID], function(err, result) {
        if(err) {
          console.log("Posting category !ERROR!", err);
          res.status(500).send(err);
          process.exit(1); //disconnect from db
        } else {
          client.query("SELECT tt.id AS tt_id, uc.id AS cat_id " +
          "FROM transaction_type AS tt, user_categories AS uc " +
          "WHERE tt.type_name = LOWER($1) AND uc.category = LOWER($2) AND uc.user_id = $3;", [transactionType, reqCategory, userID], function(err, result) {
            if (err) {
              console.log("Selecting transaction type and category !ERROR!", err);
              res.status(500).send(err);
              process.exit(1);
            } else {
              client.query("INSERT INTO transactions (wherewhat, amount, user_id, category_id, t_type_id, dates) VALUES " +
              "($1, $2, $3, $4, $5, $6);", [req.body.location, req.body.amount, userID, result.rows[0].cat_id, result.rows[0].tt_id, req.body.date], function(err, result) {
                if (err) {
                  console.log("Inserting into transactions !ERROR!", err);
                  res.status(500).send(err);
                  process.exit(1);
                } else {
                  if (transactionType === "income" || transactionType === "checking gift (income)") {
                    addToChecking(req.body.amount, userID);
                  } else if (transactionType === "cash expense") {
                    subFromCash(req.body.amount, userID);
                  } else if (transactionType === "debit expense") {
                    subFromChecking(req.body.amount, userID);
                  } else if (transactionType === "credit expense") {
                    paidWithCredit(req.body.amount, userID);
                  } else if (transactionType === "loans") {
                    addToLoans(req.body.amount, userID);
                  } else if (transactionType === "bill") {
                    addToDebt(req.body.amount, userID);
                  } else if (transactionType === "bill payment (cc)") {
                    paidBillsCC(req.body.amount, userID);
                  } else if (transactionType === "bill payment (checking)") {
                    paidBillsDebit(req.body.amount, userID);
                  } else if (transactionType === "loan payment (cc)") {
                    PaidLoansCC(req.body.amount, userID);
                  } else if (transactionType === "loan payment (checking)") {
                    PaidLoansDebit(req.body.amount, userID);
                  } else if (transactionType === "cc payment (checking)") {
                    paidCC(req.body.amount, userID);
                  } else if (transactionType === "savings to checking transfer") {
                    transferSavToCheck(req.body.amount, userID);
                  } else if (transactionType === "checking to savings transfer") {
                    transferCheckToSav(req.body.amount, userID);
                  } else if (transactionType === "checking - cash deposit" || reqCategory === "checking deposit") {
                    depositIntoChecking(req.body.amount, userID);
                  } else if (transactionType === "cash withdrawal from checking") {
                    withdrawCash(req.body.amount, userID);
                  } else if (transactionType === "cash check" || reqCategory === "cash gift (income)") {
                    cashACheck(req.body.amount, userID);
                  } //  else ifs
                } //  else
              }); //  client.query - INSERT INTO transactions
            }
          }); //  client.query - SELECT transaction type and category name
        }
      }); //  client.query - INSERT INTO categories
    }
  }); //  pg.connect
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
function addToChecking(amount, userID) {
  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log("addToChecking, pg connection !ERROR!", err);
      res.status(500).send(err);
    } else {
      console.log("updating checking");
      client.query("UPDATE checking " +
      "SET checking = checking + $1 " +
      "WHERE checking.user_id = $2;", [amount, userID], function(err, result) {
        if (err) {
          console.log("addToChecking UPDATE !ERROR!", err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          res.send(result.rows);
          done();
        }
      }); //  client.query
    } //  else
  }); //  pg.connect
} //  addToChecking
/////////////////////////////////////////////////////////////////////////////////////////////////////
function subFromCash(amount, userID) {
  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log("subFromCash, pg connection !ERROR!", err);
      res.status(500).send(err);
    } else {
      console.log("cash");
      client.query("UPDATE cash " +
      "SET cash = cash - $1 " +
      "WHERE cash.user_id = $2;", [amount, userID], function(err, result) {
        if (err) {
          console.log("subFromCash UPDATE !ERROR!", err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          res.send(result.rows);
          done();
        }
      }); //  client.query
    } //  else
  }); //  pg.connect
} //  subFromCash
/////////////////////////////////////////////////////////////////////////////////////////////////////
function subFromChecking(amount, userID) {
  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log("subFromChecking, pg connection !ERROR!", err);
      res.status(500).send(err);
    } else {
      client.query("UPDATE checking " +
      "SET checking = checking - $1 " +
      "WHERE checking.user_id = $2;", [amount, userID], function(err, result) {
        if (err) {
          console.log("subFromChecking UPDATE !ERROR!", err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          res.send(result.rows);
          done();
        }
      }); //  client.query
    } //  else
  }); //  pg.connect
} //  subFromChecking
/////////////////////////////////////////////////////////////////////////////////////////////////////
function paidWithCredit(amount, userID) {
  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log("paidWithCredit, pg connection !ERROR!", err);
      res.status(500).send(err);
    } else {
      client.query("UPDATE credit " +
      "SET total = total + $1 " +
      "WHERE credit.user_id = $2;", [amount, userID], function(err, result) {
        if (err) {
          console.log("paidWithCredit UPDATE !ERROR!", err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          res.send(result.rows);
          done();
        }
      }); //  client.query
    } //  else
  }); //  pg.connect
} //  paidWithCredit
/////////////////////////////////////////////////////////////////////////////////////////////////////
function addToLoans(amount, userID) {
  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log("AddToLoans, pg connection !ERROR!", err);
      return res.status(500).send(err);
    } else {
      client.query("UPDATE loans " +
      "SET total = total + $1 " +
      "WHERE loans.user_id = $2;", [amount, userID], function(err, result) {
        if (err) {
          console.log("UPDATE to addToLoans loans !ERROR!", err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          client.query("UPDATE debt " +
          "SET total = total + $1 " +
          "WHERE debt.user_id = $2;", [amount, userID], function(err, result) {
            if (err) {
              console.log("UPDATE to addToLoans debt !ERROR!", err);
              res.status(500).send(err);
              process.exit(1);
            } else {
              res.send(result.rows);
              done();
            } //  else
          }); //  client.query
        } //  else
      }); //  client.query
    } //  else
  }); //  pg.connect
} //  addToLoans
/////////////////////////////////////////////////////////////////////////////////////////////////////
function PaidLoansCC(amount, userID) {
  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log("PaidLoansCC, pg connection !ERROR!", err);
      return res.status(500).send(err);
    } else {
      client.query("UPDATE loans " +
      "SET total = total - $1 " +
      "WHERE loans.user_id = $2;", [amount, userID], function(err, result) {
        if (err) {
          console.log("UPDATE to PaidLoansCC loans !ERROR!", err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          client.query("UPDATE credit " +
          "SET total = total + $1 " +
          "WHERE credit.user_id = $2;", [amount, userID], function(err, result) {
            if (err) {
              console.log("UPDATE to PaidLoansCC debt !ERROR!", err);
              res.status(500).send(err);
              process.exit(1);
            } else {
              res.send(result.rows);
              done();
            } //  else
          }); //  client.query
        } //  else
      }); //  client.query
    } //  else
  }); //  pg.connect
} //  PaidLoansCC
/////////////////////////////////////////////////////////////////////////////////////////////////////
function PaidLoansDebit(amount, userID) {
  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log("PaidLoansDebit, pg connection !ERROR!", err);
      res.status(500).send(err);
    } else {
      client.query("UPDATE loans " +
      "SET total = total - $1 " +
      "WHERE loans.user_id = $2;", [amount, userID], function(err, result) {
        if (err) {
          console.log("UPDATE to PaidLoansDebit loans !ERROR!", err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          client.query("UPDATE debt " +
          "SET total = total - $1 " +
          "WHERE debt.user_id = $2;", [amount, userID], function(err, result) {
            if (err) {
              console.log("UPDATE to PaidLoansDebit debt !ERROR!", err);
              res.status(500).send(err);
              process.exit(1);
            } else {
              client.query("UPDATE checking " +
              "SET checking = checking + $1 " +
              "WHERE checking.user_id = $2;", [amount, userID], function(err, result) {
                if (err) {
                  console.log("UPDATE to PaidLoansDebit checking !ERROR!", err);
                  res.status(500).send(err);
                  process.exit(1);
                } else {
                  res.send(result.rows);
                  done();
                }
              });
            } //  else
          }); //  client.query
        } //  else
      }); //  client.query
    } //  else
  }); //  pg.connect
} //  PaidLoansDebit
/////////////////////////////////////////////////////////////////////////////////////////////////////
function paidBillsCC(amount, userID) {
  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log("paidBillsCC, pg connection !ERROR!", err);
      res.status(500).send(err);
    } else {
      client.query("UPDATE credit " +
      "SET total = total + $1 " +
      "WHERE credit.user_id = $2;", [amount, userID], function(err, result) {
        if (err) {
          console.log("UPDATE to paidBillsCC debt !ERROR!", err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          res.send(result.rows);
          done();
        } //  else
      }); //  client.query
    } //  else
  }); //  pg.connect
} //  paidBillsCC
/////////////////////////////////////////////////////////////////////////////////////////////////////
function paidBillsDebit(amount, userID) {
  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log("paidBillsDebit, pg connection !ERROR!", err);
      res.status(500).send(err);
    } else {
      client.query("UPDATE debt " +
      "SET total = total - $1 " +
      "WHERE debt.user_id = $2;", [amount, userID], function(err, result) {
        if (err) {
          console.log("UPDATE to paidBillsDebit debt !ERROR!", err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          client.query("UPDATE checking " +
          "SET checking = checking + $1 " +
          "WHERE checking.user_id = $2;", [amount, userID], function(err, result) {
            if (err) {
              console.log("UPDATE to paidBillsDebit checking !ERROR!", err);
              res.status(500).send(err);
              process.exit(1);
            } else {
              done();
            } //  else
          }); //  client.query
        } //  else
      }); //  client.query
    } //  else
  }); //  pg.connect
} //  paidBillsDebit
/////////////////////////////////////////////////////////////////////////////////////////////////////
function paidCC(amount, userID) {
  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log("paidCC, pg connection !ERROR!", err);
      res.status(500).send(err);
    } else {
      client.query("UPDATE debt " +
      "SET total = total - $1 " +
      "WHERE debt.user_id = $2;", [amount, userID], function(err, result) {
        if (err) {
          console.log("UPDATE to paidBillsDebit debt !ERROR!", err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          client.query("UPDATE credit " +
          "SET total = total - $1 " +
          "WHERE credit.user_id = $2;", [amount, userID], function(err, result) {
            if (err) {
              console.log("UPDATE to paidCC credit !ERROR!", err);
              res.status(500).send(err);
              process.exit(1);
            } else {
              client.query("UPDATE checking " +
              "SET total = total - $1 " +
              "WHERE checking.user_id = $2;", [amount, userID], function(err, result) {
                if (err) {
                  console.log("UPDATE to paidCC checking !ERROR!", err);
                  res.status(500).send(err);
                  process.exit(1);
                } else {
                  res.send(result.rows);
                  done();
                }
              });
            } //  else
          }); //  client.query
        } //  else
      }); //  client.query
    } //  else
  }); //  pg.connect
} //  paidCC
/////////////////////////////////////////////////////////////////////////////////////////////////////
function transferSavToCheck(amount, userID) {
  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log("transferSavToCheck, pg connection !ERROR!", err);
      res.status(500).send(err);
    } else {
      client.query("UPDATE savings " +
      "SET savings = savings - $1 " +
      "WHERE savings.user_id = $2;", [amount, userID], function(err, result) {
        if (err) {
          console.log("UPDATE to transferSavToCheck savings !ERROR!", err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          client.query("UPDATE checking " +
          "SET checking = checking + $1 " +
          "WHERE checking.user_id = $2;", [amount, userID], function(err, result) {
            if (err) {
              console.log("UPDATE to transferSavToCheck checking !ERROR!", err);
              res.status(500).send(err);
              process.exit(1);
            } else {
              res.send(result.rows);
              done();
            } //  else
          }); //  client.query - update checking
        } //  else
      }); //  client.query - update savings
    } //  else
  }); //  pg.connect
} //  transferSavToCheck
/////////////////////////////////////////////////////////////////////////////////////////////////////
function transferCheckToSav(amount, userID) {
  pg.connect(connection, function(err, client, done) {
    client.query("UPDATE savings " +
    "SET savings = savings + $1 " +
    "WHERE savings.user_id = $2;", [amount, userID], function(err, result) {
      if (err) {
        console.log("UPDATE to checkToSavTransfer savings !ERROR!", err);
        res.status(500).send(err);
        process.exit(1);
      } else {
        client.query("UPDATE checking " +
        "SET checking = checking - $1 " +
        "WHERE checking.user_id = $2;", [amount, userID], function(err, result) {
          if (err) {
            console.log("UPDATE to checkToSavTransfer checking !ERROR!", err);
            res.status(500).send(err);
            process.exit(1);
          } else {
            res.send(result.rows);
            done();
          } //  else
        }); //  client.query - update checking
      } //  else
    }); //  client.query - update savings
  }); //  pg.connect
} //  transferCheckToSav
/////////////////////////////////////////////////////////////////////////////////////////////////////
function depositIntoChecking(amount, userID) {
  pg.connect(connection, function(err, client, done) {
    client.query("UPDATE cash " +
    "SET total = total - $1 " +
    "WHERE cash.user_id = $2;", [amount, userID], function(err, result) {
      if (err) {
        console.log("UPDATE to checkingDeposit cash !ERROR!", err);
        res.status(500).send(err);
        process.exit(1);
      } else {
        client.query("UPDATE checking " +
        "SET checking = checking + $1 " +
        "WHERE checking.user_id = $2;", [amount, userID], function(err, result) {
          if (err) {
            console.log("UPDATE to checkingDeposit checking !ERROR!", err);
            res.status(500).send(err);
            process.exit(1);
          } else {
            res.send(result.rows);
            done();
          } //  else
        }); //  client.query - update checking
      } //  else
    }); //  client.query - update cash
  }); //  pg.connect
} //  depositIntoChecking
/////////////////////////////////////////////////////////////////////////////////////////////////////
function withdrawCash(amount, userID) {
  pg.connect(connection, function(err, client, done) {
    client.query("UPDATE cash " +
    "SET cash = cash + $1 " +
    "WHERE cash.user_id = $2;", [amount, userID], function(err, result) {
      if (err) {
        console.log("UPDATE to withdrawFromChecking cash !ERROR!", err);
        res.status(500).send(err);
        process.exit(1);
      } else {
        client.query("UPDATE checking " +
        "SET checking = checking - $1 " +
        "WHERE checking.user_id = $2;", [amount, userID], function(err, result) {
          if (err) {
            console.log("UPDATE to withdrawFromChecking checking !ERROR!", err);
            res.status(500).send(err);
            process.exit(1);
          } else {
            res.send(result.rows);
            done();
          } //  else
        }); //  client.query - update checking
      } //  else
    }); //  client.query - update cash
  }); //  pg.connection
} //  withdrawCash
/////////////////////////////////////////////////////////////////////////////////////////////////////
function cashACheck(amount, userID) {
  pg.connect(connection, function(err, client, done) {
    client.query("UPDATE cash " +
    "SET cash = cash + $1 " +
    "WHERE cash.user_id = $2;", [amount, userID], function(err, result) {
      if (err) {
        console.log("UPDATE to cash !ERROR!", err);
        res.status(500).send(err);
        process.exit(1);
      } else {
        res.send(result.rows);
        done();
      }
    }); //  client.query - update cash
  }); //  pg.connection
} //  cashACheck
/////////////////////////////////////////////////////////////////////////////////////////////////////
function addToDebt(amount, userID) {
  pg.connect(connection, function(err, client, done) {
    client.query("UPDATE debt " +
    "SET total = total + $1 " +
    "WHERE debt.user_id = $2;", [amount, userID], function(err, result) {
      if (err) {
        console.log("UPDATE to debt !ERROR!", err);
        res.status(500).send(err);
        process.exit(1);
      } else {
        res.send(result.rows);
        done();
      }
    }); //  client.query - update debt
  }); //  pg.connection
} //  cashACheck
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
}); //  post




module.exports = router;
