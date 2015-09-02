var app = angular.module('slApp');


app.service('Api', ['$http', function($http) {


	this.getTargets=  function(){
		$http.get('http://maximumstock.net/schwarmlernen/api/v1/targets')
		.success(function (response) {
			return response;
		})
	}









}]);



//http://maximumstock.net/schwarmlernen/api/v1