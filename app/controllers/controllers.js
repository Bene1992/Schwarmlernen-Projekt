var app = angular.module('slApp', ['ngRoute']);

app.controller('easyController',['$scope','factory1', function ($scope, factory1) {
	$scope.Aufgabe = factory1.getAufgaben();
}]);
