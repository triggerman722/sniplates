var ILSApp = angular.module('ILSApp', [
    'ngResource',
    'ngRoute'
]);
ILSApp.factory('ILSResource', function($resource, $http) {
    return $resource('points.json', {}, {
        getall: {method: 'GET', isArray:true}
    });
});

var ILSController = ILSApp.controller('ILSController', function($scope, $rootScope, $location, $routeParams, ILSResource, $interval) {

    ILSResource.getall({}, function(data) {
        $scope.points = data;
        var d = new Date('2019-01-01');
        var n = d.getTime();
        var d1 = new Date();
        var n1 = d1.getTime();
        $scope.tick = (n1-n)/100;
        stopTime = $interval(function() {$scope.tick++;}, 100);
    });
});
ILSApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {templateUrl: 'home.html', controller: 'ILSController'})
    ;
}]);
