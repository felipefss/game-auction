(function () {
    "use strict";

    angular.module('game')
        .service('AuctionService', AuctionService);

    AuctionService.$inject = ['$http'];
    function AuctionService($http) {
        var svc = this;

        svc.newAuction = function (item) {
            $http.post('/newAuction', item)
                .catch(function (reason) {});
        };
    }
})();