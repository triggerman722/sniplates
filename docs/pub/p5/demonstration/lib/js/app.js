var DemoApp = angular.module('DemoApp');

DemoApp.controller('DemoCtrl', function($scope) {

	$scope.buildGradient = function (hexcolor) {
		hex = String(hexcolor).replace(/[^0-9a-f]/gi, '');
		if (hex.length < 6) {
			hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
		}
		$scope.original = hexcolor;
		$scope.border = ColorChange(hexcolor, 0.05);		

	}
	function ColorChange(hex, lum) {
		var rgb = "#", c, i;
		for (i = 0; i < 3; i++) {
			c = parseInt(hex.substr(i*2,2), 16);
			c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
			rgb += ("00"+c).substr(c.length);
		}
		return rgb;
	}		
});

