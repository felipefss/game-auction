(function () {
    angular.module('game')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['UserService'];
    function LoginController(UserService) {
        var loginCtrl = this;

        loginCtrl.submitForm = function() {
            UserService.login(loginCtrl.username);
        };
    }
})();