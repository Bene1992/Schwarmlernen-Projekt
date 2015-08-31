var app = angular.module('slApp', ['ngRoute']);

app.factory('factory1', function(){
	var Aufgabe = "Aufgabe1";
	var factory = {};
	factory.getAufgaben =  function(){
		return Aufgabe;
	}
	return factory;
});