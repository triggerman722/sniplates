var DemoApp = angular.module('DemoApp', [
	'ngRoute'
]);

DemoApp.controller('DemoCtrl', function($scope, $routeParams, $location, $route, $sce) {
		
		
});

DemoApp.config(['$routeProvider', function($routeProvider) {
		$routeProvider	.when('/', {templateUrl: 'lib/views/about.html', controller: 'DemoCtrl'})
                ;
    }]);
