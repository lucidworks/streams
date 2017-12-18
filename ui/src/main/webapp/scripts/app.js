'use strict';

/**
 * @ngdoc overview
 * @name twigkitLightApp
 * @description
 * # twigkitLightApp
 *
 * Main module of the application.
 */
angular
    .module('twigkitLightApp', [
        'ui.router',
        'lightning',
        'ngAnimate'
    ]);

angular
    .module("twigkitLightApp")
    .controller("ctrl",
        function ($scope) {
            // NOTE The string value "Application" is replaced by the ThemeService.java when the application is created
            $scope.application_name = "";

            $scope.changedValue = function (item) {
                // TODO: if item not null then activate button
                $scope.topic = item.id;
            }
        });