(function () {
    "use strict";

    angular.module('game')
        .controller('MainController', MainController);

    MainController.$inject = ['user'];
    function MainController(user) {
        var mainCtrl = this;
        console.log(user);

        mainCtrl.playerStats = {
            name: user.name,
            coins: user.coins
        };

        mainCtrl.inventory = user.inventory;
    }
})();