var app = angular.module('slApp');


app.service('Api', ['$http', function($http) {


	this.getAllTargets=  function(){
			return $http.get('http://maximumstock.net/schwarmlernen/api/v1/targets')
			.then(function (res){
					return res.data
				});
	}
	
	this.getAllDegrees=  function(){
			return $http.get('http://maximumstock.net/schwarmlernen/api/v1/degrees')
				.then(function (res){
					return res.data
				});
	}

	this.getDegreeBy=  function(uuid){
			return $http.get('http://maximumstock.net/schwarmlernen/api/v1/degrees/'+uuid)
			.then(function (res){
				return res.data
			});
	}

	this.getTargetsByRef=  function(link){
			console.log(link);
			return $http.get(link)
			.then(function (res){
				return res.data
			});
	}







}]);



//http://maximumstock.net/schwarmlernen/api/v1