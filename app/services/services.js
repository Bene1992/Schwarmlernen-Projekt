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
			return $http.get(link)
			.then(function (res){
				return res.data
			});
	}
	
	this.postNode= function(msg){ 
		$http.post('http://maximumstock.net/schwarmlernen/api/v1/targets',msg)
		.then(function(response) {
			return response
  		},function(response) {
			console.log(response.data);
  		});
  	}
  	
  	this.postTask= function(msg){
  		console.log(msg); 
		$http.post('http://maximumstock.net/schwarmlernen/api/v1/tasks',msg)
		.then(function(response) {
			console.log(response);
			return response
  		},function(response) {
			console.log(response.data);
  		});
  	}
  	
  	this.postTask= function(msg){
  		console.log(msg); 
		$http.post('http://maximumstock.net/schwarmlernen/api/v1/tasks',msg)
		.then(function(response) {
			console.log(response);
			return response
  		},function(response) {
			console.log(response.data);
  		});
  	}
  	
  	//Request an Child Solutions von Task
  	this.getSolutionsByRef=  function(link){
			return $http.get(link)
			.then(function (res){
				return res.data
			});
	}
	
	//Create new user
	this.createUser= function(msg){ 
		$http.post('http://maximumstock.net/schwarmlernen/api/v1/users',msg)
		.then(function(response) {
			console.log(response);
			return response
  		},function(response) {
			console.log(response.data);
  		});
  	}
  	
  	//Get all Users
  	this.getAllUsers=  function(){
			return $http.get('http://maximumstock.net/schwarmlernen/api/v1/users')
			.then(function (res){
				return res.data
			});
	}
  	
  	
  	
  	
}]);
