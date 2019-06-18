(function () {
    angular.module('game')
        .component('playerStats', {
            templateUrl: 'js/main/stats.html',
            bindings: {
                player: '<'
            },
            controller: PlayerStatsController
        });

    PlayerStatsController.$inject = ['$location'];
    function PlayerStatsController($location) {
        var $ctrl = this;
        
        $ctrl.logout = function() {
            $location.path('/');
        };
    }
})();
