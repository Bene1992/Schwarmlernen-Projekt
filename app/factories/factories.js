var app = angular.module('slApp', []);

app.factory('factory1', function(){
	var Aufgaben = [A,B,C,D,E,F];
	var factory = {};
	factory.getAufgaben =  function(){
		return Aufgabe;
	}
	return factory;
});