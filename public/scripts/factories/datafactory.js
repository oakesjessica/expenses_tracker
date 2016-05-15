myApp.factory('DataFactory', ['$http', function($http) {

  //PRIVATE

  var newTransaction = undefined;

  // post info from the input view
  var saveNewTransaction = function(newTransaction) {
    console.log('factory transaction', newTransaction);
    var promise = $http.post('/input/', newTransaction).then(function(response) {
    });
    return promise;
  };

  var retrieveTransaction = function() {
    var promise = $http.get('/input').then(function(response) { // go to the GET in  inputmodule and wait for a response. then use that data in this next function.
      newTransaction = response.data; // save those results to the transaction variable and go back to the controller
      console.log("inside the retrieveTransaction", newTransaction); // newTransaction is an array of transaction objects
    });
    return promise; // needed to wrap up this function
  };

  var deleteFromTransactionList = function(data) {
    console.log(data);
    var promise = $http.delete('/transaction/transactionList' + data).then(function(response) {
    });
    return promise;
  };

  //PUBLIC

  var dataFactoryOutput = {

  sendNewTransaction: function(newTransaction) {
    return saveNewTransaction(newTransaction);
  },
  getNewTransaction: function() {
    return retrieveTransaction();
  },
  getTransactionVariable: function() {
    return newTransaction;
    console.log('in getTransactionVariable' + newTransaction);
  },
  deleteTransaction: function(id) {
    return deleteFromTransactionList(id);
  }
  };

  return dataFactoryOutput;
}]);
