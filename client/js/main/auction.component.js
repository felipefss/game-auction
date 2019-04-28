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
        // $ctrl.winningBid = 0;
        // $ctrl.bid = 500;
        var firstBid = false;
        var timer;

        socket.on('startAuction', function (data) {
            $ctrl.auction = data;
            $ctrl.winningBid = data.minBid;
            $ctrl.bid = data.minBid;
            $ctrl.activeAuctions = true;
            startTimer(data.duration);
        });

        socket.on('newBid', function (data) {
            if (firstBid == false) {
                firstBid = true;
                $ctrl.bidText = 'Winning bid';
            }
            $ctrl.auction.duration = data.duration;
            $ctrl.winningBid = data.winningBid;
            $ctrl.bid = $ctrl.winningBid;
        });

        $ctrl.controlLimit = function () {
            if ($ctrl.bid < $ctrl.winningBid) {
                $ctrl.bid = $ctrl.winningBid;
            }
        };

        $ctrl.placeBid = function () {
            var bidObj = {
                id: $ctrl.auction.ID,
                bidder: $ctrl.player,
                bid: $ctrl.bid
            };
            socket.emit('placeBid', bidObj);
        };

        function startTimer(repetitions) {
            timer = $interval(function() {
                $ctrl.auction.duration--;
            }, 1000, repetitions);
        }
    }
})();