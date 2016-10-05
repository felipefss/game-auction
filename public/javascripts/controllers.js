'use strict';

var app = angular.module('myApp.controllers', []);

app.factory('users', ['$http', function($http) {
    var obj = {
        currentUser: '',
        users: []
    };

    obj.findUser = function(username) {
        return obj.users.find(function(user) {
            return user.player === username;
        });
    };

    obj.getUsers = () => {
        $http.get('/getUsers').then(function(res) {
            if (res.data.length > 0) {
                for (var i = 0; i < res.data.length; i++ ) {
                    obj.users.push(res.data[i]);
                }
            }
        });
    };

    obj.createUser = function(username) {
        var newUser = {
            player: username,
            balance: 1000,
            inventory: {
                breads: 30,
                carrots: 18,
                diamonds: 1
            }
        };

        $http.post('/newUser', newUser).then(function(res) {
            if (res.status === 200) {
                obj.users.push(newUser);
            }
        });
    };

    obj.updateUser = function(info) {

    };

    return obj;
}]);

app.factory('auctions', ['$http', function($http) {
    var obj = {};

    obj.getAuctionList = function(callback) {
        $http.get('/getAuctions').then(function(res) {
            if (res) {
                callback(res.data);
            }
        });
    };

    obj.startAuction = function(info) {
        var auction = {
            seller: info.seller,
            itemName: info.itemName,
            quantity: info.quantity,
            minBid: info.minBid
        };

        $http.post('/startAuction', auction).then(function(res) {
            if (res.status === 200) {
                console.log('SUCCESS!');
            }
        });
    };

    return obj;
}]);

app.controller('MainCtrl', ['$scope', 'users', '$location', 'socket', function($scope, users, $location, socket) {
    // Set automatic focus to username input
    $(document).ready(function() {
        $('#usr').focus();
        users.getUsers();
        socket.emit('ping');
        socket.on('pong', function(data) {
            console.log(data);
        });
    });

    $scope.login = function() {
        if ($scope.username) {
            var currUser = users.findUser($scope.username);

            // If username typed doesn't exist, create a new one
            if (users.users.length === 0 || !currUser) {
                users.createUser($scope.username);
            }

            users.currentUser = $scope.username;

            $location.path('/home');
        }
    };
}]);

app.controller('HomeCtrl', ['$scope', function($scope) {

}]);

app.controller('PlayerCtrl', ['$scope', 'users', function($scope, users) {
    $scope.player = users.currentUser;
    var player = users.findUser($scope.player);
    $scope.coins = player.balance;
}]);

app.controller('InventoryCtrl', ['$scope', 'users', 'auctions', function($scope, users, auctions)  {
    var player = users.findUser(users.currentUser);
    $scope.inventory = player.inventory;
    var maxQuantity,
        itemName;

    $('#myModal').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget);
        itemName = button.data('whatever');

        switch (itemName) {
            case 'breads':
                maxQuantity = player.inventory.breads;
                break;
            case 'carrots':
                maxQuantity = player.inventory.carrots;
                break;
            case 'diamonds':
                maxQuantity = player.inventory.diamonds;
                break;
        }
        $('#itemQuantity').val(0);
        $('#minBid').val(0);
    });
    
    $scope.changeQuantityBid = function() {
        if ($('#itemQuantity').val() >= maxQuantity) {
            $('#itemQuantity').val(maxQuantity);
        }
    };

    $scope.startAuctionBtn = function() {
        if ($('#itemQuantity').val() > 0 && $('#minBid').val() > 0) {
            var auctionInfo = {
                seller: player.player,
                itemName: itemName,
                quantity: parseInt($('#itemQuantity').val()),
                minBid: parseInt($('#minBid').val())
            };

            auctions.startAuction(auctionInfo);

            $('#myModal').modal('hide');
        }
    };
}]);

app.controller('AuctionCtrl', ['$scope', 'users', 'auctions', 'socket', function($scope, users, auctions, socket) {
    $scope.activeAuction = false;
    $scope.winningBid = false;

    socket.emit('isRunningAuction');

    socket.on('beginAuction', function(data) {
        $scope.seller = data.seller;
        $scope.itemName = data.itemName;
        $scope.quantity = data.quantity;
        $scope.minBid = data.minBid;
        $('#winBid').val(data.minBid + 10);
        $scope.activeAuction = true;
    });

    socket.on('runningAuction', function(data) {
        $scope.seller = data.seller;
        $scope.itemName = data.itemName;
        $scope.quantity = data.quantity;
        $scope.minBid = data.minBid;
        $scope.activeAuction = true;
        $('#winBid').val(data.minBid + 10);

        if (parseInt($('#winBid').val()) > parseInt($scope.minBid)) {
            $scope.winningBid = true;
        }
    });

    socket.on('updateTime', function(seconds) {
        $scope.timeLeft = seconds;
        $scope.activeAuction = true;
    });

    socket.on('updateBid', function(data) {
        $('#winBid').val(data.winBid + 10);
        if (parseInt($('#winBid').val()) > parseInt($scope.minBid)) {
            $scope.winningBid = true;
        }
        $scope.minBid = data.winBid;
    });
    
    socket.on('finalizeAuction', function() {
        users.getUsers();

        var player = users.findUser(users.currentUser);
        $scope.coins = player.balance;
        $scope.inventory = player.inventory;
        
        $scope.timeLeft = null;
        $scope.seller = null;
        $scope.itemName = null;
        $scope.quantity = null;
        $scope.minBid = null;
        $scope.winningBid = false;
        $scope.activeAuction = false;
        $('#winBid').val(0);
    });

    $scope.placeBid = function() {
        if (parseInt($('#winBid').val() > $scope.coins)) {
            alert('Bid should be higher than number of coins.');
        } else {
            if (parseInt($('#winBid').val()) >= parseInt($scope.minBid)) {
                var bid = {
                    bidder: users.currentUser,
                    winBid: parseInt($('#winBid').val())
                };

                if ($scope.timeLeft <= 10) {
                    $scope.timeLeft += 10;
                }

                socket.emit('placeBid', bid);
            }
        }
    };
}]);