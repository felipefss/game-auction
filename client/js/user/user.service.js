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
                    //Organize inventory in an array
                    var user = response.data;
                    // var inv = user.inventory;
                    // var newInv = [];

                    // for (var i in inv) {
                    //     if (inv.hasOwnProperty(i)) {
                    //         var obj = {};
                    //         obj[i] = inv[i];
                    //         newInv.push(obj);
                    //     }
                    // }
                    // user.inventory = newInv;
                    return user;
                })
                .catch(function (reason) {
                    console.error(reason);
                });
        };
    }
})();