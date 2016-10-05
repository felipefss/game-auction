'use strict';

var app = angular.module('myApp.directives', []);

app.directive('playerStats', function() {
    return {
        restrict: 'E',
        templateUrl: '/partials/playerStats.html',
        controller: 'PlayerCtrl'
    };
});

app.directive('inventory', function() {
    return {
        restrict: 'E',
        templateUrl: '/partials/inventory.html',
        controller: 'InventoryCtrl'
    };
});

app.directive('currentAuction', function() {
    return {
        restrict: 'E',
        templateUrl: '/partials/auction.html',
        controller: 'AuctionCtrl'
    };
});