(function () {
    "use strict";

    angular.module('game')
        .service('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var svc = this;

        var user = {};

        svc.get = function() {
            return user;
        };

        svc.login = function (userName) {
            return $http.post('/login', { user: userName })
                .then(function (response) {
                    return response.status;
                }).catch(function (reason) {
                    console.error(reason);
                });
        };

        svc.logout = function () {
            return $http.post('/logout', {})
                .then(function (response) {
                    return response.status;
                })
                .catch(function (reason) {
                    console.error(reason);
                });
        };

        svc.fetchUser = function (userName) {
            return $http.get('/getUser/' + userName)
                .then(function (response) {
                    user = response.data;
                    return user;
                })
                .catch(function (reason) {
                    console.error(reason);
                });
        };
    }
})();
