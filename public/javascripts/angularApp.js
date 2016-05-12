'use strict';

var app = angular.module('gameAuction', [
    'myApp.controllers',
    'myApp.directives',
    'ngRoute'
]);

app.config(['$routeProvider', ($routeProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: '/partials/login.html',
            controller: 'MainCtrl'
        })
        .when('/home', {
            templateUrl: '/partials/home.html',
            controller: 'HomeCtrl'
        })
        .otherwise('/');
}]);