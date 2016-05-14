var router = require("express").Router();
var pg = require('pg');
var connection = require('../modules/connection');

router.get("/", function(req, res) {
  pg.connect(connection, function(err, client, done) {
  //
  }); //  pg.connect
}); //  router.get

/**
* Posting layout
* 1) Insert user's category into user_categories table
* 2) Select transaction type ID and user_categories ID
* 3) Insert into transactions with information and ID's (user, transaction type, category)
* 4) Update cash, checking, savings, debt, loans based on categories
*/

router.post("/", function(req, res) {
  var userID = 1;

  var incomeOrGift = req.body.category === "income" || req.body.category === "checking gift (income)";
  var expCash = req.body.category === "cash expense";
  var expDebit = req.body.category === "debit expense";
  var expCC = req.body.category === "credit expense";
  var tookOutLoan = req.body.category === "loans";
  var bill = req.body.category === "bill";
  var billCC = req.body.category === "bill payment (cc)";
  var billDebit = req.body.category === "bill payment (checking)";
  var loanCC = req.body.category === "loan payment (cc)";
  var debitLoan = req.body.category === "loan payment (checking)";
  var ccPayment = req.body.category === "cc payment (checking)";
  var savToCheckTransfer = req.body.category === "savings to checking transfer";
  var checkToSavTransfer = req.body.category === "checking to savings transfer";
  var checkingDeposit = req.body.category === "checking - cash deposit" || req.body.category === "checking deposit";
  var cashWithdrawal = req.body.category === "cash withdrawal from checking";
  var cashCheck = req.body.category === "cash check" || req.body.category === "cash gift (income)";

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
                  if (incomeOrGift) {
                    addToCashCheckSav("checking", req.body.amount, userID);
                  } else if (bill) {
                    bills(req.body.amount, userID);
                  } else if (expCash) {
                    subFromCashCheckSav("cash", req.body.amount, userID);
                  } else if (expDebit) {
                    subFromCashCheckSav("debit", req.body.amount, userID);
                  } else if (expCC) {
                    subFromCashCheckSav("credit", req.body.amount, userID);
                  } else if (tookOutLoan) {
                    addToLoans(req.body.amount, userID);
                  } else if (billCC) {
                    paidBillsCC(req.body.amount, userID);
                  } else if (billDebit) {
                    paidBillsDebit(req.body.amount, userID);
                  } else if (loanCC) {
                    PaidLoansCC(req.body.amount, userID);
                  } else if (debitLoan) {
                    PaidLoansDebit(req.body.amount, userID);
                  } else if (ccPayment) {
                    paidCC(req.body.amount, userID);
                  } else if (savToCheckTransfer) {
                    transferSavToCheck(req.body.amount, userID);
                  } else if (checkToSavTransfer) {
                    transferCheckToSav(req.body.amount, userID);
                  } else if (checkingDeposit) {
                    depositIntoChecking(req.body.amount, userID);
                  } else if (cashWithdrawal) {
                    withdrawFromChecking(req.body.amount, userID);
                  } else if (cashCheck) {
                    cashGiftORCheck(req.body.amount, userID);
                  }
                } //  else
              }); //  client.query - INSERT INTO transactions
            }
          }); //  client.query - SELECT transaction type and category name
        }
      }); //  client.query - INSERT INTO categories
    }
  });
});
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
/////////////////////////////////////////////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////////////////////////////////////////////
function addToLoans(amount, userID) {
  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log("AddToLoans, pg connection !ERROR!", err);
      res.status(500).send(err);
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
      res.status(500).send(err);
    } else {
      client.query("UPDATE loans " +
      "SET total = total - $1 " +
      "WHERE loans.user_id = $2;", [amount, userID], function(err, result) {
        if (err) {
          console.log("UPDATE to PaidLoansCC loans !ERROR!", err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          client.query("UPDATE debt " +
          "SET total = total - $1 " +
          "WHERE debt.user_id = $2;", [amount, userID], function(err, result) {
            if (err) {
              console.log("UPDATE to PaidLoansCC debt !ERROR!", err);
              res.status(500).send(err);
              process.exit(1);
            } else {
              client.query("UPDATE credit " +
              "SET total = total + $1 " +
              "WHERE credit.user_id = $2;", [amount, userID], function(err, result) {
                if (err) {
                  console.log("UPDATE to PaidLoansCC credit !ERROR!", err);
                  res.status(500).send(err);
                  process.exit(1);
                } else {
                  done();
                }
              });
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
              "SET total = total + $1 " +
              "WHERE checking.user_id = $2;", [amount, userID], function(err, result) {
                if (err) {
                  console.log("UPDATE to PaidLoansDebit checking !ERROR!", err);
                  res.status(500).send(err);
                  process.exit(1);
                } else {
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
      client.query("UPDATE debt " +
      "SET debt = total - $1 " +
      "WHERE debt.user_id = $2;", [amount, userID], function(err, result) {
        if (err) {
          console.log("UPDATE to paidBillsCC debt !ERROR!", err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          client.query("UPDATE credit " +
          "SET total = total + $1 " +
          "WHERE credit.user_id = $2;", [amount, userID], function(err, result) {
            if (err) {
              console.log("UPDATE to paidBillsCC credit !ERROR!", err);
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
} //  paidBillsCC
/////////////////////////////////////////////////////////////////////////////////////////////////////
function paidBillsDebit(amount, userID) {
  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log("paidBillsDebit, pg connection !ERROR!", err);
      res.status(500).send(err);
    } else {
      client.query("UPDATE debt " +
      "SET debt = total - $1 " +
      "WHERE debt.user_id = $2;", [amount, userID], function(err, result) {
        if (err) {
          console.log("UPDATE to paidBillsDebit debt !ERROR!", err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          client.query("UPDATE checking " +
          "SET total = total + $1 " +
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
      "SET debt = total - $1 " +
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
      "SET total = total - $1 " +
      "WHERE savings.user_id = $2;", [amount, userID], function(err, result) {
        if (err) {
          console.log("UPDATE to transferSavToCheck savings !ERROR!", err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          client.query("UPDATE checking " +
          "SET total = total + $1 " +
          "WHERE checking.user_id = $2;", [amount, userID], function(err, result) {
            if (err) {
              console.log("UPDATE to transferSavToCheck checking !ERROR!", err);
              res.status(500).send(err);
              process.exit(1);
            } else {
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
    if (err) {
      console.log("transferCheckToSav, pg connection !ERROR!", err);
      res.status(500).send(err);
    } else {
      client.query("UPDATE savings " +
      "SET total = total + $1 " +
      "WHERE savings.user_id = $2;", [amount, userID], function(err, result) {
        if (err) {
          console.log("UPDATE to transferCheckToSav savings !ERROR!", err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          client.query("UPDATE checking " +
          "SET total = total - $1 " +
          "WHERE checking.user_id = $2;", [amount, userID], function(err, result) {
            if (err) {
              console.log("UPDATE to transferCheckToSav checking !ERROR!", err);
              res.status(500).send(err);
              process.exit(1);
            } else {
              done();
            } //  else
          }); //  client.query - update checking
        } //  else
      }); //  client.query - update savings
    } //  else
  }); //  pg.connect
} //  transferCheckToSav
/////////////////////////////////////////////////////////////////////////////////////////////////////
function depositIntoChecking(amount, userID) {
  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log("depositIntoChecking, pg connection !ERROR!", err);
      res.status(500).send(err);
    } else {
      client.query("UPDATE cash " +
      "SET total = total - $1 " +
      "WHERE cash.user_id = $2;", [amount, userID], function(err, result) {
        if (err) {
          console.log("UPDATE to depositIntoChecking cash !ERROR!", err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          client.query("UPDATE checking " +
          "SET total = total + $1 " +
          "WHERE checking.user_id = $2;", [amount, userID], function(err, result) {
            if (err) {
              console.log("UPDATE to depositIntoChecking checking !ERROR!", err);
              res.status(500).send(err);
              process.exit(1);
            } else {
              done();
            } //  else
          }); //  client.query - update checking
        } //  else
      }); //  client.query - update cash
    } //  else
  }); //  pg.connect
} //  depositIntoChecking
/////////////////////////////////////////////////////////////////////////////////////////////////////
function withdrawFromChecking(amount, userID) {
  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log("withdrawFromChecking, pg connection !ERROR!", err);
      res.status(500).send(err);
    } else {
      client.query("UPDATE cash " +
      "SET total = total + $1 " +
      "WHERE cash.user_id = $2;", [amount, userID], function(err, result) {
        if (err) {
          console.log("UPDATE to withdrawFromChecking cash !ERROR!", err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          client.query("UPDATE checking " +
          "SET total = total - $1 " +
          "WHERE checking.user_id = $2;", [amount, userID], function(err, result) {
            if (err) {
              console.log("UPDATE to withdrawFromChecking checking !ERROR!", err);
              res.status(500).send(err);
              process.exit(1);
            } else {
              done();
            } //  else
          }); //  client.query - update checking
        } //  else
      }); //  client.query - update cash
    } //  else
  }); //  pg.connect
} //  withdrawFromChecking
/////////////////////////////////////////////////////////////////////////////////////////////////////
function cashGiftORCheck(amount, userID) {
  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log("cashGiftORCheck, pg connection !ERROR!", err);
      res.status(500).send(err);
    } else {
      client.query("UPDATE cash " +
      "SET total = total + $1 " +
      "WHERE cash.user_id = $2;", [amount, userID], function(err, result) {
        if (err) {
          console.log("UPDATE to cashGiftORCheck cash !ERROR!", err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          done();
        }
      }); //  client.query - update cash
    } //  else
  }); //  pg.connect
} //  cashGiftORCheck
/////////////////////////////////////////////////////////////////////////////////////////////////////


module.exports = router;
