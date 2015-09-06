var app = angular.module('slApp');

app.config(['$httpProvider',function ($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
}]);

app.factory('httpRequestInterceptor',['$cookies', function ($cookies) {
  return {
    request: function (config) {
      var token = $cookies.get('X-Access-Token');
      config.headers['X-Access-Token'] = token;
      return config;
    }
  };
}]);

app.service('Api', ['$http','$cookies', function($http,$cookies) {


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
		},function(response) {
			console.log(response);
  		});
	}

	this.getDegreeBy=  function(uuid){
		return $http.get('http://maximumstock.net/schwarmlernen/api/v1/degrees/'+uuid)
		.then(function (res){
			return res.data
		},function(response) {
			console.log(response.data);
  		});
	}

	this.getTargetsByRef=  function(link){
		return $http.get(link)
		.then(function (res){
			return res.data
		},function(response) {
			console.log(response.data);
  		});
	}
	
	this.postTarget= function(msg){ 
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
  	
  	this.postInfo= function(msg){
  		console.log(msg); 
		$http.post('http://maximumstock.net/schwarmlernen/api/v1/infos',msg)
		.then(function(response) {
			console.log(response);
			return response
  		},function(response) {
			console.log(response);
  		});
  	}
  	
  	//Request an Child Solutions von Task
  	this.getSolutionsByRef=  function(link){
		return $http.get(link)
		.then(function (res){
			return res.data
		},function(response) {
			console.log(response);
  		});
	}
	
	//Create new user
	this.createUser= function(msg){ 
		$http.post('http://maximumstock.net/schwarmlernen/api/v1/register',msg)
		.then(function(response) {
			return response
  		},function(response) {
			console.log(response.data);
  		});
  	}
  	
  	this.saveUserToken= function(msg){ 
		$http.post('http://maximumstock.net/schwarmlernen/api/v1/login',msg)
		.then(function(response) {
			console.log(response.data);
			$cookies.put('X-Access-Token',response.data.token);
			alert("Angemeldet: "+response.data.success);
			return response.data;
  		});
  	}
  	
  	this.deleteUserToken= function(){ 
		$cookies.remove('X-Access-Token');
  	}
  	
  	//Get all Users
  	this.getAllUsers=  function(){
		return $http.get('http://maximumstock.net/schwarmlernen/api/v1/users')
		.then(function (res){
			return res.data
		},function(response) {
			console.log(response.data);
  		});
	}
	
	

  	
}]);



