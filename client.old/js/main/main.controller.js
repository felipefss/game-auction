(function () {
    "use strict";

    angular.module('game')
        .controller('MainController', MainController);

    MainController.$inject = ['user', '$scope', 'UserService'];
    function MainController(user, $scope, UserService) {
        var mainCtrl = this;

        mainCtrl.playerStats = {
            name: user.name,
            coins: user.coins
        };

        mainCtrl.inventory = user.inventory;

        $scope.$on(user.name + ':endAuction', function (ev) {
            UserService.fetchUser(user.name).then(function (data) {
                mainCtrl.playerStats.coins = data.coins;
                mainCtrl.inventory = data.inventory;
            });
        });
    }
})();
