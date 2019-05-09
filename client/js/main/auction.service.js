(function () {
    "use strict";

    angular.module('game')
        .service('AuctionService', AuctionService);

    AuctionService.$inject = ['$http'];
    function AuctionService($http) {
        var svc = this;

        svc.newAuction = function (item) {
            $http.post('/newAuction', item)
                .catch(function (reason) {
                    console.error(reason);
                });
        };

        svc.getOnGoingAuction = function () {
            return $http.get('/getCurrentAuction')
                .then(function (response) {
                    return response.data;
                })
                .catch(function (reason) {
                    console.error(reason);
                });
        };
    }
})();
