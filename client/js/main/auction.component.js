(function () {
    angular.module('game')
        .component('auction', {
            templateUrl: 'js/main/auction.html',
            bindings: {
                player: '<'
            },
            controller: AuctionController
        });

    AuctionController.$inject = ['socket', '$scope'];
    function AuctionController(socket, $scope) {
        var $ctrl = this;

        $ctrl.endAuction = false;
        var minBidText = 'Minimum bid';
        var firstBid;

        // Initializes values
        var init = function () {
            $ctrl.activeAuctions = false;
            $ctrl.bidText = minBidText;
            firstBid = false;
        };
        init();

        var bidTextChange = function () {
            if (firstBid == false) {
                firstBid = true;
                $ctrl.bidText = 'Winning bid';
            }
        };

        var startAuction = function (auction) {
            $ctrl.auction = auction;
            $ctrl.winningBid = auction.minBid;
            $ctrl.bid = auction.minBid;
            $ctrl.activeAuctions = true;
            $ctrl.endAuction = false;

            if (auction.winningBid > 0) {
                bidTextChange();
            }
        };

        socket.on('countdown', function (data) {
            if ($ctrl.activeAuctions == false) {
                startAuction(data.auction);
            }

            $ctrl.duration = data.duration;
        });

        socket.on('newBid', function (data) {
            bidTextChange();
            $ctrl.winningBid = data.bid;
            $ctrl.bid = $ctrl.winningBid + 1;
        });

        socket.on('endAuction', function (data) {
            init();

            if (data) {
                $scope.$emit(data.buyer + ':endAuction', data.itemName);
                $scope.$emit(data.seller + ':endAuction', data.itemName);
                $ctrl.endAuction = true;
                $ctrl.winningBid = data.bid;
                $ctrl.buyer = data.buyer;
            }
        });

        socket.on('noAuctions', function () {
            $ctrl.endAuction = false;
        });

        $ctrl.controlBidLimit = function () {
            if ($ctrl.bid < $ctrl.winningBid) {
                $ctrl.bid = $ctrl.winningBid;
            } else if ($ctrl.bid > $ctrl.player.coins) {
                $ctrl.bid = $ctrl.player.coins;
            }
        };

        $ctrl.placeBid = function () {
            var bidObj = {
                id: $ctrl.auction.ID,
                bidder: $ctrl.player.name,
                bid: $ctrl.bid
            };
            socket.emit('placeBid', bidObj);
        };
    }
})();
