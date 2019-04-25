(function () {
    angular.module('game')
        .component('inventory', {
            templateUrl: 'js/main/inventory.html',
            bindings: {
                items: '<'
            },
            controller: InventoryController
        });

    InventoryController.$inject = [];
    function InventoryController() {
        var $ctrl = this;
        $ctrl.auctionMinBid = 1;

        $('#confirmAuction').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget);
            var itemName = button.data('item');

            $ctrl.maxQty = $ctrl.items[itemName];
            $ctrl.auctionQuantity = $ctrl.maxQty;

            var modal = $(this);
            modal.find('.modal-title').text('Auction for ' + itemName);
            modal.find('#quantityInput').val($ctrl.maxQty);
        });

        $ctrl.startAuction = function () {
            console.log($ctrl.auctionQuantity);
        };

        $ctrl.controlLimit = function () {
            if ($ctrl.auctionQuantity > $ctrl.maxQty) {
                $ctrl.auctionQuantity = $ctrl.maxQty;
            }
        };
    }
})();