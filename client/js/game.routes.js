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
                url: '/main/{username}',
                templateUrl: 'js/main/main.html',
                controller: 'MainController',
                controllerAs: 'mainCtrl',
                resolve: {
                    user: ['UserService', '$stateParams', function(UserService, $stateParams) {
                        return UserService.getUser($stateParams.username);
                    }]
                }
            });
    }
})();
