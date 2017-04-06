var DemoApp = angular.module('DemoApp', [
	'ngResource',
	'ngRoute'
]);

DemoApp.factory('DataResource', function($resource) {
			return $resource('data/:datatype/:id.json', {}, {
				query: {method: 'GET', isArray: true},
				get: {method: 'GET'},
				remove: {method: 'DELETE'},
				edit: {method: 'PUT'},
				set: {method: 'PUT', isArray: true}				
			});
		});
DemoApp.factory('itemService', function() {
 var savedData = {}
 function set(data) {
   savedData = data;
 }
 function get() {
  return savedData;
 }

 return {
  set: set,
  get: get
 }

});
DemoApp.controller('DemoCtrl', function($scope, $routeParams, $location, DataResource, $route, $sce, itemService) {

	var parts;
	var basetype;

	if ($location) {
		parts = $location.path().split("/");
	
		basetype = parts[1]; //eg. locations, or products, or whatever
	
		if (parts.length < 3) {
			$scope.items = DataResource.query({datatype:basetype, id:basetype});
		}

		if (parts[1] === 'dashboard') {
			google.load('visualization', '1', {packages:['geochart'], callback: drawRegionsMap});
			$(window).resize(function(){
				drawRegionsMap();
			});
		}	
	}
	$scope.getResourceUrl = function(url) {
		var retUrl = $sce.trustAsResourceUrl(url);
		return retUrl;
	}
	if ($routeParams.id) {
		//$scope.item = DataResource.get({datatype:basetype,id:$routeParams.id});
		DataResource.get({datatype:basetype,id:$routeParams.id}, function(data) { 
			$scope.item = data;			
			for (var property in $scope.item) {
			    if ($scope.item.hasOwnProperty(property)) {
				if (angular.isArray($scope.item[property])) {
					var arrayLength = $scope.item[property].length;
					angular.forEach($scope.item[property], function(items){
						DataResource.get({datatype:property,id:items.id}, (function(items) {
							return function(data) { 
								data.id = items.id;							
								angular.copy(data, items);
								
							}
						})(items));
					});
				}
			    }
			}			
		});
	}
	$scope.getFullItem = function(basetype, id) {
		DataResource.query({datatype:basetype,id:id}, function(data) { 
			$scope.fullitem = data;
		});
	};	
	$scope.getEmail = function(person) {
		var theEmail = person.data.email;
		return theEmail;
	}
	$scope.getFileIcon = function(url) {
		if (url == null)
			return;

		switch (url.split('.').pop()) {
			case "pdf": {
				return "fa fa-file-pdf-o color-pdf";
			}
			case "xlsx": {
				return "fa fa-file-excel-o color-excel";
			}
			case "docx": {
				return "fa fa-file-word-o color-word";
			}
			case "sql": {
				return "fa fa-file-code-o color-code";					
			}
			case "jpg": {
				return "fa fa-file-image-o color-image";
			}
		}
	}
	function drawRegionsMap() {
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'City');
		data.addColumn('number', 'Active Cases');    
		data.addRows([        
			[{v:"AL-05",f:"Bentonville"},65],
			[{v:"AL-06",f:"Huntsville"},65],
			[{v:"AL-07",f:"Margaritaville"},65],
			[{v:"AL-00",f:"Margaritaville"},165],
			[{v:"AL-01",f:"Margaritaville"},133],
			[{v:"AL-02",f:"Margaritaville"},25],
			[{v:"AL-03",f:"Margaritaville"},23],
			[{v:"AL-04",f:"Margaritaville"},29],
			[{v:"AL-09",f:"Margaritaville"},22],
			[{v:"AL-10",f:"Margaritaville"},22],
			[{v:"AL-11",f:"Margaritaville"},22],
			[{v:"AL-12",f:"Margaritaville"},22],
			[{v:"AL-13",f:"Margaritaville"},22],
			[{v:"AL-14",f:"Margaritaville"},22],
			[{v:"AL-15",f:"Margaritaville"},22],
			[{v:"AL-16",f:"Margaritaville"},22],
			[{v:"AL-17",f:"Margaritaville"},22],
			[{v:"AL-08",f:"Pumavilla"},65]
		]);
		google.visualization.GeoChart.setMapsSource('data/maps');		
		var view = new google.visualization.DataView(data);
		view.setColumns([0, 1]);
		var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
		chart.draw(view, {
			width: '100%',
			region:'US-AL',
			resolution:'provinces',
			displayMode: 'regions'    
		});
      	}
		
});

DemoApp.config(['$routeProvider', function($routeProvider) {
		$routeProvider	.when('/about', {templateUrl: 'lib/views/about.html', controller: 'DemoCtrl'})
				.when('/contact', {templateUrl: 'lib/views/contact.html', controller: 'DemoCtrl'})
				.when('/dashboard', {templateUrl: 'lib/views/dashboard.html', controller: 'DemoCtrl'})
				.when('/documents/:id', {templateUrl: 'lib/views/viewdocument.html', controller: 'DemoCtrl'})
				.when('/documents', {templateUrl: 'lib/views/listdocuments.html', controller: 'DemoCtrl'})
				.when('/clients/:id', {templateUrl: 'lib/views/viewpeople.html', controller: 'DemoCtrl'})
				.when('/clients', {templateUrl: 'lib/views/listpeople.html', controller: 'DemoCtrl'})
				.when('/cases/:id', {templateUrl: 'lib/views/viewcase.html', controller: 'DemoCtrl'})
				.when('/cases', {templateUrl: 'lib/views/listcases.html', controller: 'DemoCtrl'})				
                ;
    }]);
