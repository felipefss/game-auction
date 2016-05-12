'use strict';

var app = angular.module('myApp.controllers', []);

app.factory('users', [() => {
    let obj = {
        currentUser: '',
        users: []
    };

    obj.findUser = (username) => {
        return obj.users.find((user) => {
            return user;
        }, username);
    };

    return obj;
}]);

app.controller('MainCtrl', ['$scope', 'users', '$location', ($scope, users, $location) => {
    // Set automatic focus to username input
    $(document).ready(function() {
        $('#usr').focus();
    });
    
    let userObj = users.users;

    $scope.login = () => {
        if ($scope.username) {
            let currUser = users.findUser($scope.username);

            // If username typed doesn't exist, create a new one
            if (userObj.length === 0 || !currUser) {
                userObj.push({
                    player: $scope.username,
                    balance: 1000,
                    inventory: {
                        breads: 30,
                        carrots: 18,
                        diamonds: 1
                    }
                });

                currUser = $scope.username;
            }

            users.currentUser = currUser;

            $location.path('/home');
        }
    };
}]);

app.controller('HomeCtrl', ['$scope', ($scope) => {

}]);

app.controller('PlayerCtrl', ['$scope', 'users', ($scope, users) => {
    $scope.player = users.currentUser;
    let player = users.findUser($scope.player);
    $scope.coins = player.balance;
}]);

app.controller('InventoryCtrl', ['$scope', 'users', ($scope, users) => {
    let player = users.findUser(users.currentUser);
    $scope.inventory = player.inventory;
}]);

app.controller('AuctionCtrl', ['$scope', 'users', ($scope, users) => {
    
}]);