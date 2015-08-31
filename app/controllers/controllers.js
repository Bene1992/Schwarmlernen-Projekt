var app = angular.module('slApp', []);

app.controller('easyController', function ($scope, factory1) {
	$scope.Aufgabe = factory1.getAufgaben();
});
