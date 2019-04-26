(function () {
    "use strict";

    angular.module('game')
        .controller('MainController', MainController);

    MainController.$inject = ['user', 'socket'];
    function MainController(user, socket) {
        var mainCtrl = this;
        console.log(user);
        console.log(socket)

        mainCtrl.playerStats = {
            name: user.name,
            coins: user.coins
        };

        mainCtrl.inventory = user.inventory;
    }
})();