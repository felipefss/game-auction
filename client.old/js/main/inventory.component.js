(function () {
    angular.module('game')
        .component('inventory', {
            templateUrl: 'js/main/inventory.html',
            bindings: {
                items: '<',
                player: '<'
            },
            controller: InventoryController
        });

    InventoryController.$inject = ['AuctionService'];
    function InventoryController(AuctionService) {
        var $ctrl = this;
        $ctrl.auctionMinBid = 1;

        $('#confirmAuction').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget);
            $ctrl.itemName = button.data('item');

            $ctrl.maxQty = $ctrl.items[$ctrl.itemName];
            $ctrl.auctionQuantity = $ctrl.maxQty;

            var modal = $(this);
            modal.find('.modal-title').text('Auction for ' + $ctrl.itemName);
            modal.find('#quantityInput').val($ctrl.maxQty);
        });

        $ctrl.startAuction = function () {
            var obj = {
                seller: $ctrl.player,
                itemName: $ctrl.itemName,
                quantity: $ctrl.auctionQuantity,
                minBid: $ctrl.auctionMinBid
            };
            AuctionService.newAuction(obj);
        };

        $ctrl.controlLimit = function () {
            if ($ctrl.auctionQuantity > $ctrl.maxQty) {
                $ctrl.auctionQuantity = $ctrl.maxQty;
            }
        };
    }
})();
