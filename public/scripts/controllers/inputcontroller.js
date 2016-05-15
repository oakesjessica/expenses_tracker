myApp.controller('InputController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {

    $scope.dataFactory = DataFactory;

    // GET runs when html file loads via ng-repeat
    $scope.dataFactory.getNewTransaction().then(function() { //go to the data factory and run this function. come back to write the .then when you have the results stored in the data factory.
        $scope.transactions = $scope.dataFactory.getTransactionVariable(); // get the data from this function in the data factory and assign it to transactions (ng-repeat variable) to use in the html ng-repeat
    });

    $scope.cc = [""];

    // send newWord to the data factory
    $scope.saveNewTransaction = function() {
        var newTransaction = { // set ng-model variable to variable newTransaction
            date: $scope.date,
            location: $scope.location,
            category: $scope.category,
            amount: $scope.amount,
            transactionType: $scope.transactionType
        };
        console.log('info in controller', newTransaction);
        $scope.dataFactory.sendNewTransaction(newTransaction).then(function() {
            $scope.dataFactory.getNewTransaction().then(function() { //go to the data factory and run this function. come back to write the .then when you have the results stored in the data factory.
                $scope.transactions = $scope.dataFactory.getTransactionVariable(); // get the data from this function in the data factory and assign it to transactions (ng-repeat variable) to use in the html ng-repeat
            });
        }); // send newTransaction variable to this function in the data factory

        $scope.newTransaction = '';
        $scope.description = '';
        $scope.date = '';
        $scope.location = '';
        $scope.category = '';
        $scope.amount = '';
        $scope.transactionType = '';
    };

    // remove transaction
    $scope.deleteTransaction = function(id) {
        $scope.dataFactory.deleteTransaction(id).then(function() {
            $scope.dataFactory.getNewTransaction().then(function() {
                $scope.transactions = $scope.dataFactory.getTransactionVariable();
            }); // put up on the DOM
        });
    };

    // $scope.dataFactory.retrieveTransaction();

    $scope.dataFactory.getNewTransaction();
}]);
