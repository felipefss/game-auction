(function () {
    angular.module('game')
        .component('auction', {
            templateUrl: 'js/main/auction.html',
            bindings: {},
            controller: AuctionController
        });

    AuctionController.$inject = [];
    function AuctionController() {
        var $ctrl = this;

        $ctrl.activeAuctions = true;
        $ctrl.bidText = 'Minimum bid';
        $ctrl.val = 500;
    }
})();