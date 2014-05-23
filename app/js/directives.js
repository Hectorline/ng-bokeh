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
                options:'='
            },
            restrict: 'AE',
            replace: true,
            template: '<div class="bokeh-plot-directive-root"></div>',
            link: function(scope, elem, attrs) {
                var makePlot = function (options){
                    console.log(elem.html());
                    console.log("clear");
                    elem.html('');
                    var data = options.data;
                    var scatter = options.renderers[0];
                    var options2 = options.options;
                    scope.plot = Bokeh.Plotting.make_plot(scatter, data, options2);
                    Bokeh.Plotting.show(scope.plot, elem);};
                makePlot();

                var compileOptions = function(opt){
                    var newOpt = opt;
                    var scopeVars = [];
                    var grabScopeVar = function(scopeVarName, path){
                        var actualVal = scope.$parent[scopeVarName];
                        var parentObj = opt;
                        _.each(path.slice(0,path.length-1), function(k){
                            parentObj = parentObj[k]
                        });
                        parentObj[path[path.length-1]] = actualVal;
                    };
                    var handleScopeVar = function(scopeVarName, path){
                        grabScopeVar(scopeVarName, path);
                        scope.$parent.$watch(scopeVarName, function(){
                            grabScopeVar(scopeVarName, path);
                            makePlot(opt);});
                    };
                    walk(opt, 
                         function(root, val, path){
                             if(typeof(val) == "string"){
                                 if(val.length>0 && val[0]=="$"){
                                     handleScopeVar(val.slice(1), path);}}});
                };
                scope.$watch('options', 
                             function(a,b,c){
                                 debugger;
                                 compileOptions();});
            }
    }});

var walk = function (oobj, visitor, obj, path){
    if(typeof(obj)=="undefined"){
        obj = oobj;
        path = [];
    }
    _.each(_.keys(obj), function(k){
        var tempPath = path.concat([k]);
        visitor(oobj, obj[k], tempPath);
        if(typeof(obj[k])=="obj") {
            walk(oobj, visitor, obj[k], tempPath);}
    });
};

walk(
    {'foo':3, 'bar':9, baz:{'bop':10}},
    function(o, val, tPath){
        console.log(o, val, tPath);
    });
