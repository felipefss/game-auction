(function () {
    "use strict";

    angular.module('game')
        .service('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var svc = this;

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

        svc.getUser = function (userName) {
            return $http.get('/getUser/' + userName)
                .then(function (response) {
                    var user = response.data;
                    return user;
                })
                .catch(function (reason) {
                    console.error(reason);
                });
        };
    }
})();
