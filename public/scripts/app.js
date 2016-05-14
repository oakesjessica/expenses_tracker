var myApp = angular.module('myApp', ['ngRoute', 'mobile-angular-ui', 'ngTagsInput']);

myApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/input', {
            templateUrl: '/views/templates/input.html',
            controller: 'InputController'
        })
        .otherwise({
            redirectTo: 'input'
        });
}]);