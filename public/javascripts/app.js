'use strict';

angular.module('myApp', [
    'myApp.controllers',

    'ngRoute'
]).
config(['$routeProvider', ($routeProvider) => {
    $routeProvider
        .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainCtrl'
    })
        .otherwise({
            redirectTo: '/'
        });
}]);