var app = angular.module('slApp');

app.factory('factory1', function(){
	var Aufgabe = "Aufgabe1";
	var factory = {};
	factory.getAufgaben =  function(){
		return Aufgabe;
	}
	return factory;
});

app.factory('targetFactory', function($http){
	
	var factory = {};
	var targets = [];
	
	
	factory.getTargets =  function(){
		$http.get('http://maximumstock.net/schwarmlernen/api/v1/targets')
		.success(function (response) {
			targets=response;
		}).then(function(){
			return targets;
		});
	}
	return factory;
});

//http://maximumstock.net/schwarmlernen/api/v1