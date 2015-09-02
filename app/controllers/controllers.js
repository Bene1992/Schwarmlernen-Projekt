var app = angular.module('slApp');

app.controller('easyController',['$scope','$http','Api', function ($scope,$http, Api) {

	

	
	$scope.test = function() {
		Api.getTargets()
		.then (function(data) {
			console.log(data);
			$scope.Targets = data; 
		})
	};
	
	
}]);
