(function () {
    angular.module('game')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['UserService', '$location'];
    function LoginController(UserService, $location) {
        var loginCtrl = this;
        loginCtrl.error = false;

        loginCtrl.submitForm = function () {
            UserService.login(loginCtrl.username)
                .then(function (res) {
                    if (res === 200) {
                        $location.path('/main/' + loginCtrl.username);
                    } else {
                        loginCtrl.error = true;
                    }
                });
        };
    }
})();