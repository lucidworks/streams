'use strict';

angular.module('twigkitSetupApp').config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    // For any unmatched url, redirect to homepage /
    var defaultPage = 'setup';
    $urlRouterProvider.otherwise(defaultPage);
    $locationProvider.html5Mode(false);


    // Default views
    $stateProvider

        // Default rule to display view based on url
        .state('page', {
            url: '/{slug}',
            templateUrl: function (params) {

                if (params.slug === '') {
                    params.slug = defaultPage;
                }

                return 'setup/views/' + params.slug + '.html';
            },
            controller: 'SetupCtrl'
        })


});
