'use strict';

angular.module('twigkitSetupApp')

    .controller('MainCtrl', ['$rootScope', '$scope', '$stateParams', 'ResponseService', '$location', 'ModalService', '$twigkit', '$timeout', function ($rootScope, $scope, $stateParams, ResponseService, $location, ModalService, $twigkit, $timeout) {
        $scope.params = $stateParams;
        $scope.urlparams = $location.search();
        $rootScope.redirectTo = function (page) {
            $location.path(page);
        };

        $scope.closeModal = function (name) {
            ModalService.close(name);
        };

    }]);
