(function () {
    "use strict";

    angular.module('game').config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];
    function routeConfig($stateProvider) {

        $stateProvider
            .state('/', {
                url: '/',
                templateUrl: 'js/user/login.html',
                controller: 'LoginController',
                controllerAs: 'loginCtrl'
            })
            .state('/main', {
                url: '/main/{user}',
                templateUrl: 'js/main/main.html',
                controller: 'MainController',
                controllerAs: 'mainCtrl'
            });
    }
})();