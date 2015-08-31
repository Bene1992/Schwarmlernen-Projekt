var app = angular.module('slApp');

app.controller('easyController',['$scope','$http','factory1', function ($scope,$http, factory1) {
	$scope.Aufgabe = factory1.getAufgaben();
	
	
	$http.get('http://maximumstock.net/schwarmlernen/api/v1/targets')
		.success(function (response) {
			targets=response;
		}).then(function(){
			$scope.Targets = targets;
		});
	

	
	
}]);
