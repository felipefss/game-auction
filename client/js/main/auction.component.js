(function () {
    angular.module('game')
        .component('auction', {
            templateUrl: 'js/main/auction.html',
            bindings: {
                player: '<'
            },
            controller: AuctionController
        });

    AuctionController.$inject = ['socket', '$interval'];
    function AuctionController(socket, $interval) {
        var $ctrl = this;

        $ctrl.activeAuctions = false;
        $ctrl.bidText = 'Minimum bid';
        $ctrl.duration = 90;
        // $ctrl.winningBid = 0;
        // $ctrl.bid = 500;
        var firstBid = false;
        var timer;

        socket.on('startAuction', function (data) {
            $ctrl.auction = data;
            $ctrl.duration = data.duration;
            $ctrl.winningBid = data.minBid;
            $ctrl.bid = data.minBid;
            $ctrl.activeAuctions = true;
            startTimer($ctrl.duration);
        });

        function startTimer(repetitions) {
            timer = $interval(function() {
                $ctrl.duration--;
            }, 1000, repetitions);
        }
    }
})();