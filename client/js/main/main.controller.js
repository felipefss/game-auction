(function () {
    "use strict";

    angular.module('game')
        .controller('MainController', MainController)
        .constant('socket', io('http://localhost:3000'));

    MainController.$inject = ['user', '$scope', 'UserService'];
    function MainController(user, $scope, UserService) {
        var mainCtrl = this;
        console.log(user);

        mainCtrl.playerStats = {
            name: user.name,
            coins: user.coins
        };

        mainCtrl.inventory = user.inventory;

        $scope.$on('endAuction', function (ev) {
            UserService.getUser(user.name).then(function (data) {
                mainCtrl.playerStats.coins = data.coins;
                mainCtrl.inventory = data.inventory;
            });
        });
    }
})();
