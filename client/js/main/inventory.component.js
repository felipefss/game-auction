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
    function InventoryController () {
        var $ctrl = this;
    }
})();