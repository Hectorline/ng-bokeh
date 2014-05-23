'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('MyCtrl1', ['$scope', function($scope) {
        var r = new Bokeh.Random(123456789);


        var x = _.map(_.range(4000), function () {return r.randf()*100;});
        var y = _.map(_.range(4000), function () {return r.randf()*100;});

        var color = _.map(_.zip(x,y), function (val){
            var r = (Math.floor(50+2*val[0])).toString();
            var g =  (Math.floor(30+2*val[1])).toString();
            return "rgb(" + r + "," + g + ",150)";});
        
        $scope.options = {
            data : {
                x: x,
                y: y,
                radius: _.map(_.range(4000), function () {return r.randf()+0.3;}),
                color: color
            },
            renderers : [{
                type: 'circle',
                x: 'x',
                y: 'y',
                radius: 'radius',
                radius_units: 'data',
                fill_color: 'color',
                fill_alpha: 0.6,
                line_color: null
            }],
            
            options : {
                title: "Scatter Demo",
                dims: [600, 600],
                xrange: [0, 100],
                yrange: [0, 100],
                xaxes: "min",
                yaxes: "min",
                tools: true,
                legend: false
            }};

        $scope.make_blue = function () {
            $scope.outer_renderers = [{
                type: 'circle',
                x: 'x',
                y: 'y',
                radius: 'radius',
                radius_units: 'data',
                fill_color: 'blue',
                fill_alpha: 0.6,
                line_color: null
            }];
        };


        $scope.make_red = function () {
            $scope.outer_renderers = [{
                type: 'circle',
                x: 'x',
                y: 'y',
                radius: 'radius',
                radius_units: 'data',
                fill_color: 'red',
                fill_alpha: 0.6,
                line_color: null
            }];
        };




    }])
    .controller('MyCtrl2', ['$scope', function($scope) {

    }]);
