'use strict';

/* Directives */


angular.module('myApp.directives', []).
    directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }])
    .directive('bokehPlot', function() {
        return {
            scope: {
                data:'=',
                renderers:'=',
                options:'=',

            },
            restrict: 'AE',
            replace: true,
            template: '<div class="bokeh-plot-directive-root"></div>',
            link: function(scope, elem, attrs) {
                var makePlot = function (){
                    console.log(elem.html());
                    console.log("clear");
                    elem.html('');
                    var data = scope.data;
                    var scatter = scope.renderers[0];
                    var options = scope.options;
                    scope.plot = Bokeh.Plotting.make_plot(scatter, data, options);
                    Bokeh.Plotting.show(scope.plot, elem);
                };
                makePlot();
                scope.$watch('data', makePlot);
                scope.$watch('renderers', makePlot);
                scope.$watch('options', makePlot);
            }
        };
    });
