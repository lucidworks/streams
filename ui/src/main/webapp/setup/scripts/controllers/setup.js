'use strict';

angular
    .module("twigkitSetupApp")
    .controller("SetupCtrl", ['$scope', '$interval', '$http', '$window', '$timeout', function ($scope, $interval, $http, $window, $timeout) {

        $scope.status = {
            working: false
        };

        $scope.realms = ['native'];
        $scope.hostAvailable = false;
        $scope.hostNotAvailable = false;
        $scope.authenticated = false;
        $scope.notAuthenticated = false;
        $scope.working = false;
        $scope.connectText = 'Connect';
        $scope.authenticateText = 'Authenticate';
        $scope.configureText = 'Next';
        $scope.customizeText = 'Save and launch app!';
        $scope.stepClass = 'step-1';

        $scope.samplePopovers = {};

        // Flip Code / Help
        $scope.flip = function () {
            $scope.flipped = !$scope.flipped;
        };

        // toggle samples
        $scope.showsample = function (field) {
            if (!$scope.samplePopovers[field]) {
              // Set others to false
              Object.keys($scope.samplePopovers).forEach(function(key) {
                return $scope.samplePopovers[key] = false;
              });

              $scope.samplePopovers[field] = true;

            } else {
              $scope.samplePopovers[field] = false;
            }
        };

        $scope.samplePopoverShow = function (field) {
          return $scope.samplePopovers[field];
        };

        // Reset connect button when config changes
        $scope.enableConnectButton = function () {
            if (!$scope.hostAvailable) {
                $scope.connectText = 'Connect';
                $scope.connectClass = false;
            }
        };

        $scope.enableAuthenticateButton = function () {
            if (!$scope.authenticated) {
                $scope.authenticateText = 'Authenticate';
                $scope.authenticateClass = false;
            }
        };

        $scope.collections = ['default'];
        $scope.pipelines = ['default'];

        $scope.config = {
            user: '',
            password: '',
            host: '',
            port: 8764,
            session: '',
            realm: $scope.realms[0],
            collection: 'default',
            pipeline: 'default',
            application_name: '',
            color: 'black',
            done: false
        };

        $scope.view = {
            results: {
                title_field: null,
                url_field: null,
                description_field: null,
                metadata: []
            },
            facets: []
        };

        $scope.markup = {
            results: '',
            facets: ''
        };


        /**@name iterate*/
        /**@name when*/
        /**@name attr*/
        /**@name el*/
        /**@name search*/
        /**@namespace search*/
        /**@name result_list*/
        /**@name result*/
        /**@name field*/
        /**@name facet_list*/
        /**@name facet*/
        /**@name platform*/
        /**@name query*/
        /**@name response*/
        /**@name _name*/
        /**@name max_characters*/
        /**@name styling*/
        /**@name urlfield*/
        /**@name label*/
        /**@name facet_names*/
        /**@name show*/
        /**@name show_more*/
        StirUp({
            elements: ['search:result-list', 'search:result', 'search:field', 'search:facet-list', 'search:facet'],
            attributes: ['platform', 'query', 'response', 'name', 'max-characters', 'styling', 'urlfield', 'label', 'facet-names', 'show', 'show-more']
        }, window);

        $scope.$watch('view.results', build_markup, true);
        $scope.$watch('view.facets', build_markup, true);


        function build_markup() {
            // Real markup that will go into search.html
            $scope.markup.results =
                search.result_list(response('response'), styling('cards-sm-1 cards-lg-2 cards-xl-2'), platform('platform'), query('query'), attr('instant-results', 'true'),
                    search.result(
                        search.field(
                            _name($scope.view.results.title_field),
                            styling('title'),
                            urlfield($scope.view.results.url_field)
                        ),
                        when($scope.view.results.description_field !== null,
                            search.field(
                                _name($scope.view.results.description_field),
                                styling('description'),
                                max_characters(150)
                            )
                        ),
                        iterate($scope.view.facets, function (facet) {
                            return when(facet.show_in_results, search.field(
                                _name(facet.name),
                                when(facet.label, label(facet.label)),
                                styling('label-left')
                            )).make();
                        })
                    )
                ).make();

            // Representative markup that will be shown in the app
            $scope.markup.results_formatted = formatCode(search.result_list(response('response'),
                search.result(
                    search.field(
                        _name($scope.view.results.title_field),
                        styling('title'),
                        urlfield($scope.view.results.url_field)
                    ),
                    when($scope.view.results.description_field !== null,
                        search.field(
                            _name($scope.view.results.description_field),
                            styling('description'),
                            max_characters(150)
                        )
                    ),
                    iterate($scope.view.facets, function (facet) {
                        return when(facet.show_in_results, search.field(
                            _name(facet.name),
                            when(facet.label, label(facet.label)),
                            styling('label-left')
                        )).make();
                    })
                )
            ).make(), true, true);

            var facetNames = '';
            var searchable = '';
            if ($scope.view.facets.length > 0) {
                for (var i in $scope.view.facets) {
                    var facet = $scope.view.facets[i];
                    if (facet.show) {
                        if (facetNames.length > 0) {
                            facetNames += ',';
                        }
                        facetNames += facet.name;
                        if (facet.label !== undefined) {
                            facetNames += '=' + facet.label;
                        }
                        if (facet.search_within_facet === true) {
                            if (searchable.length > 0) {
                                searchable += ',';
                            }
                            searchable += facet.name;
                        }
                    }
                }
            }

            if (facetNames.length === 0) {
                facetNames = "*";
            }

            $scope.markup.facets =
                search.facet_list(facet_names(facetNames), response('response'), platform('platform'), query('query'), styling('facet-list facet-list-wrappedheader'),
                    when(searchable.length > 0, search.facet(attr('when-field', searchable), show(10), attr('search-enabled', true), platform('platform'), query('query'), max_characters(40), show(12), show_more(24), attr('collapsible', true))),
                    search.facet(show(10), max_characters(40), show(12), show_more(24), attr('collapsible', true))
                ).make();

            console.log($scope.markup.facets)
            $scope.markup.facets_formatted = formatCode(search.facet_list(facet_names(facetNames), response('response'),
                search.facet(show(10), show(12), show_more(24))
            ).make(), true, true);
        }

        var formatCode = function(code, stripWhiteSpaces, stripEmptyLines) {
            var whitespace          = ' '.repeat(4);             // Default indenting 4 whitespaces
            var currentIndent       = 0;
            var char                = null;
            var nextChar            = null;


            var result = '';
            for(var pos=0; pos <= code.length; pos++) {
                char            = code.substr(pos, 1);
                nextChar        = code.substr(pos+1, 1);

                // If opening tag, add newline character and indention
                if(char === '<' && nextChar !== '/') {
                    result += '\n' + whitespace.repeat(currentIndent);
                    currentIndent++;
                }
                // if Closing tag, add newline and indention
                else if(char === '<' && nextChar === '/') {
                    // If there're more closing tags than opening
                    if(--currentIndent < 0) currentIndent = 0;
                    result += '\n' + whitespace.repeat(currentIndent);
                }

                // remove multiple whitespaces
                else if(stripWhiteSpaces === true && char === ' ' && nextChar === ' ') char = '';
                // remove empty lines
                else if(stripEmptyLines === true && char === '\n' ) {
                    //debugger;
                    if(code.substr(pos, code.substr(pos).indexOf("<")).trim() === '' ) char = '';
                }

                result += char;
            }

            return result;
        }

        $scope.$watch('config.collection', function () {
            $scope.suggested_pipelines = [];

            var hasDefault = false;
            for (var p in $scope.pipelines) {
                if ($scope.pipelines[p].startsWith($scope.config.collection) && $scope.pipelines[p].indexOf('_signals-') < 0 && $scope.pipelines[p].indexOf('_logs-') < 0) {
                    if ($scope.pipelines[p] == $scope.config.collection + '-default') {
                        hasDefault = true;
                    } else if ($scope.pipelines[p].endsWith('-default')) {
                        $scope.suggested_pipelines.unshift($scope.pipelines[p]);
                    } else {
                        $scope.suggested_pipelines.push($scope.pipelines[p]);
                    }
                }
            }
            if (hasDefault) $scope.suggested_pipelines.unshift($scope.config.collection + '-default')
        }, true);

        $scope.steps = [
            {templateUrl: '/setup/views/connect.html', controller: 'stepCtrl'},
            {templateUrl: '/setup/views/authenticate.html', controller: 'stepCtrl'},
            {templateUrl: '/setup/views/configure.html', controller: 'stepCtrl'},
            {templateUrl: '/setup/views/analyzing.html', controller: 'stepCtrl'},
            {templateUrl: '/setup/views/choosepages.html', controller: 'stepCtrl'},
            {templateUrl: '/setup/views/fields-title.html', controller: 'stepCtrl'},
            {templateUrl: '/setup/views/fields-descr.html', controller: 'stepCtrl'},
            {templateUrl: '/setup/views/facets.html', controller: 'stepCtrl'},
            {templateUrl: '/setup/views/dashboard-intro.html', controller: 'stepCtrl'},
            {templateUrl: '/setup/views/dashboard.html', controller: 'stepCtrl'},
            {templateUrl: '/setup/views/customize.html', controller: 'stepCtrl'},
        ];

        $scope.onStepChange = function () {

            if ($scope.config.step == 4) {
                getInsights();
            }

            $scope.stepClass = 'step-' + $scope.config.step;

            // console.log($scope.view);
        };

        $scope.colors = ['black', 'asphalt', 'concrete', 'sky', 'mint', 'emerald', 'sunflower', 'carrot', 'strawberry', 'raspberry'];
        $scope.selectedColor = 'black';
        $scope.hexColor = "";

        $scope.setColor = function (color) {
            $scope.selectedColor = color;
            $scope.config.color = '@color-' + color;

            $scope.hexColor = "";
            // Seemingly only way of clearing HEX
            document.getElementById('hexColor').value = "";
        };

        $scope.setHexColor = function (color) {
            $scope.selectedColor = color;
            $scope.config.color = '#' + color;
        };

        $scope.init = function () {
            // Checking if instance is running locally
            $http({
                method: 'HEAD',
                url: "http://localhost:8764/"
            }).then(function successCallback(response) {
                $scope.host = "localhost";
                $scope.connect();
            }, function errorCallback(response) {
                console.log("No Fusion running locally");
            });
        }

        $scope.init();

        $scope.connect = function () {

            $scope.connectClass = 'btn-loading';
            $scope.connectText = 'Connecting...';

            $http({
                method: 'GET',
                url: "/twigkit/api/setup/realms/" + $scope.config.host + ":" + $scope.config.port
            }).then(function successCallback(response) {
                $scope.connectClass = 'btn-loaded';
                $scope.connectText = 'Connected';
                $scope.realms = response.data;
                $scope.hostAvailable = true;
                $scope.hostNotAvailable = false;
            }, function errorCallback(response) {
                $scope.connectClass = 'btn-loaderror';
                $scope.connectText = 'Check details';
                $scope.hostAvailable = false;
                $scope.hostNotAvailable = true;
            });
        }

        $scope.authenticate = function () {

            $scope.authenticateClass = 'btn-loading';
            $scope.authenticateText = 'Authenticating...';

            $http({
                method: 'GET',
                url: "/twigkit/api/setup/session/" + $scope.config.host + ":" + $scope.config.port + "?user=" + $scope.config.user + "&password=" + $scope.config.password + "&realm=" + $scope.config.realm
            }).then(function successCallback(response) {
                if (response.data.session) {
                    $scope.authenticateClass = 'btn-loaded';
                    $scope.authenticateText = 'Authenticated';
                    $scope.config.session = response.data.session;
                    $scope.authenticated = true;
                    $scope.notAuthenticated = false;
                    pipelines();
                    collections();
                }
            }, function errorCallback(response) {
                $scope.authenticateClass = 'btn-loaderror';
                $scope.authenticateText = 'Unable to authenticate';
                $scope.authenticated = false;
                $scope.notAuthenticated = true;
            });
        }

        function collections() {
            $http({
                method: 'GET',
                url: "/twigkit/api/setup/collections?session=" + $scope.config.session
            }).then(function successCallback(response) {
                $scope.collections = response.data;
            }, function errorCallback(response) {
                console.log(response)
            });

            pipelines();
        }

        function pipelines() {
            $http({
                method: 'GET',
                url: "/twigkit/api/setup/query-pipelines?session=" + $scope.config.session
            }).then(function successCallback(response) {
                $scope.pipelines = response.data;
            }, function errorCallback(response) {
                console.log(response)
            });
        }

        function getInsights() {
            $scope.status.working = true;

            $interval(function () {
                var auth = window.btoa($scope.config.user + ":" + $scope.config.password),
                    headers = {"Authorization": "Basic " + auth};
                $http({
                    method: 'GET',
                    headers: headers,
                    url: "/twigkit/api/insights/platforms.fusion.data?q=&max=200"
                }).then(function successCallback(response) {
                    $scope.insights = response.data;

                    // Adding all facets to the markup backing list
                    for (var i in $scope.insights.facets) {
                        var facet = $scope.insights.facets[i];
                        facet.show = false;
                        facet.show_in_results = false;
                        $scope.view.facets.push(facet);
                    }


                    $scope.status.working = false;
                }, function errorCallback(response) {
                    console.log(response)
                    $scope.status.working = false;
                });
            }, 2500, 1);
        };

        $scope.configure = function (done) {
            // if (e.preventDefault) e.preventDefault();
            $scope.config.done = done;

            if (done) {
                // Submitting the markup because we're at the end of the process
                $scope.config.result_list = $scope.markup.results;
                $scope.config.facet_list = $scope.markup.facets;

                $scope.configureClass = 'btn-loading';
                $scope.configureText = 'Launching...';
            }
            var url = '/twigkit/api/app/setup';

            $scope.working = true;

            return $http({
                method: 'POST',
                url: url,
                transformRequest: angular.identity,
                data: JSON.stringify($scope.config)
            }).then(function (response) {
                $scope.working = false;
                if (done) {
                    if (response.status !== 200) {
                        $scope.configureClass = 'btn-loaderror';
                        $scope.configureText = 'Could not save these settings';
                    }

                    $scope.customizeClass = 'btn-loading';
                    $scope.customizeText = 'Launching...';

                    $interval(function () {
                        $window.open('/', '_self');
                    }, 5000, 1);
                }
            }, function errorCallback(response) {
                $scope.working = false;
                console.log(response);
                if (done) {
                    $scope.configureClass = 'btn-loaderror';
                    $scope.configureText = 'Error';
                }
            });
        };

        $scope.waitForPort = function (e) {
            if (e.key == ":") {
                e.preventDefault();
                document.getElementById('port').focus();
                document.getElementById('port').select();
            }
        }

        window.cancel = function (e) {
            if (e.preventDefault) e.preventDefault();

            $scope.$apply(function () {
                $scope.dragging = true;
            });

            e.dataTransfer.dropEffect = 'copy';
            return false;
        }

        window.cancelDrag = function (e) {
            if (e.preventDefault) e.preventDefault();
            $scope.$apply(function () {
                $scope.dragging = false;
                $scope.over = false;
            });
        }

        window.onTarget = function (e) {
            if (e.preventDefault) e.preventDefault();
            $scope.$apply(function () {
                $scope.hostAvailable = false;
                $scope.hostNotAvailable = false;
                $scope.over = true;
            });
        }

        window.drop = function (e) {
            if (e.preventDefault) e.preventDefault();
            var url = e.dataTransfer.getData('Text');

            if (url.length > 0) {
                var host = parseHost(url);

                $scope.$apply(function () {
                    $scope.config.host = host[1];
                    $scope.config.port = host[2];
                    $scope.connect();
                    $scope.dragging = false;
                });
            }
        }

        function parseHost(url) {
            return /https?:\/\/(.*):([0-9]{2,6})/.exec(url);
        }
    }])
    .controller('stepCtrl', ['$scope', 'multiStepFormInstance', function ($scope, multiStepFormInstance) {
        $scope.$parent.config.step = multiStepFormInstance.getActiveIndex();
    }]);