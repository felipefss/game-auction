'use strict';

var app = angular.module('gameAuction', [
    'btford.socket-io',
    'myApp.controllers',
    'myApp.directives',
    'ngRoute'
]);

app.config(['$routeProvider', function($routeProvider) {
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

app.factory('socket', function(socketFactory) {
    return socketFactory();
});