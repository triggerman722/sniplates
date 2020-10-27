var ILSApp = angular.module('ILSApp', [
    'ngResource',
    'ngRoute'
]);
ILSApp.factory('ILSResource', function($resource, $http) {
    return $resource('points.json', {}, {
        getall: {method: 'GET', isArray:true}
    });
});
ILSApp.factory("datapoints",function(){
        return {};
});

var ILSController = ILSApp.controller('ILSController', function(datapoints, $scope, $rootScope, $location, $routeParams, ILSResource, $interval) {
    
    if ($routeParams.id) {
        $scope.pointer = datapoints.points[$routeParams.id];
    } else {
        ILSResource.getall({}, function(data) {
            $scope.points = data;
            $scope.datapoints = datapoints;
            $scope.datapoints.points = data;
        });
    }
    var d = new Date('2019-01-01');
    var n = d.getTime();
    var d1 = new Date();
    var n1 = d1.getTime();
    $scope.tick = (n1-n)/100;
    stopTime = $interval(function() {$scope.tick++;}, 100);

});
ILSApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/:id', {templateUrl: 'single.html' , controller: 'ILSController'})
    .when('/', {templateUrl: 'home.html', controller: 'ILSController'})
    ;
}]);
