'use strict';

/**
 * @ngdoc function
 * @name twigkitLightApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the twigkitLightApp
 */
angular.module('twigkitLightApp')

    .controller('MainCtrl', ['$rootScope', '$scope', '$stateParams', 'ResponseService', '$location', 'ModalService', '$twigkit', '$timeout', function ($rootScope, $scope, $stateParams, ResponseService, $location, ModalService, $twigkit, $timeout) {
        $scope.params = $stateParams;
        $scope.urlparams = $location.search();
        $rootScope.redirectTo = function (page) {
            $location.path(page);
        };

        $rootScope.contextPath = $twigkit.getContextPath('/');


    }]);

angular.module('twigkitLightApp')
    .filter('encodeURIComponent', function () {
        return window.encodeURIComponent;
    })

    .filter('landingPageLabel', function () {
        return function (input) {
            return input.split('|')[0];
        }
    })

    .filter('landingPageLink', function () {
        return function (input) {
            return input.split('|')[1];
        }
    });