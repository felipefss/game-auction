(function () {
    "use strict";

    angular.module('game')
        .service('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var svc = this;

        svc.login = function (username) {
            $http.post('/login', username)
                .then(function (response) {
                    return response.data;
                });
        };
    }
})();