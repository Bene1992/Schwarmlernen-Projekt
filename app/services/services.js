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
	}
	
	this.getTarget= function(uuid){
		return $http.get('http://maximumstock.net/schwarmlernen/api/v1/targets/'+uuid)
	}
	
	this.getTask= function(uuid){
		return $http.get('http://maximumstock.net/schwarmlernen/api/v1/tasks/'+uuid)
	}
	
	this.getInfo= function(uuid){
		return $http.get('http://maximumstock.net/schwarmlernen/api/v1/infos/'+uuid)
	}
	
	this.getSolution= function(uuid){
		return $http.get('http://maximumstock.net/schwarmlernen/api/v1/solutions/'+uuid)
	}
	
	this.saveTask= function(uuid,msg){
		return $http.put('http://maximumstock.net/schwarmlernen/api/v1/tasks/'+uuid,msg)
	}
	
	this.saveInfo= function(uuid,msg){
		return $http.put('http://maximumstock.net/schwarmlernen/api/v1/infos/'+uuid,msg)
	}
	
	this.saveSolution= function(uuid,msg){
		return $http.put('http://maximumstock.net/schwarmlernen/api/v1/solutions/'+uuid,msg)
	}
	
	this.submitTask= function(uuid){
		return $http.put('http://maximumstock.net/schwarmlernen/api/v1/tasks/'+uuid+'/submit')
	}
	
	this.submitInfo= function(uuid){
		return $http.put('http://maximumstock.net/schwarmlernen/api/v1/infos/'+uuid+'/submit')
	}
	
	this.submitSolution= function(uuid){
		return $http.put('http://maximumstock.net/schwarmlernen/api/v1/solutions/'+uuid+'/submit')
	}
	
	
	this.getRatingOfTask=  function(uuid){
		return $http.get('http://maximumstock.net/schwarmlernen/api/v1/tasks/'+uuid+'/ratings')
	}
	
	this.getMyRatingOfTask=  function(uuid){
		return $http.get('http://maximumstock.net/schwarmlernen/api/v1/tasks/'+uuid+'/rating')
	}
	
	this.postRatingOfTask=  function(msg,uuid){
		return $http.post('http://maximumstock.net/schwarmlernen/api/v1/tasks/'+uuid+'/ratings',msg)
	}
	
	this.getRatingOfSolution=  function(uuid){
		return $http.get('http://maximumstock.net/schwarmlernen/api/v1/solutions/'+uuid+'/ratings')
	}
	
	this.getMyRatingOfSolution=  function(uuid){
		return $http.get('http://maximumstock.net/schwarmlernen/api/v1/solutions/'+uuid+'/rating')
	}
	
	this.postRatingOfSolution=  function(msg,uuid){
		return $http.post('http://maximumstock.net/schwarmlernen/api/v1/solutions/'+uuid+'/ratings',msg)
	}
	
	this.getRatingOfInfo=  function(uuid){
		return $http.get('http://maximumstock.net/schwarmlernen/api/v1/infos/'+uuid+'/ratings')
	}
	
	this.getMyRatingOfInfo=  function(uuid){
		return $http.get('http://maximumstock.net/schwarmlernen/api/v1/infos/'+uuid+'/rating')
	}
	
	this.postRatingOfInfo=  function(msg,uuid){
		return $http.post('http://maximumstock.net/schwarmlernen/api/v1/infos/'+uuid+'/ratings',msg)
	}
	
	this.postRatingOfRating=  function(msg,uuid){
		return $http.post('http://maximumstock.net/schwarmlernen/api/v1/ratings/'+uuid+'/ratings',msg)
	}
	
	this.postConfig=  function(uuid,msg){
		return $http.put('http://maximumstock.net/schwarmlernen/api/v1/targets/'+uuid+'/config',msg)
	}
	
	this.postGlobalConfig=  function(uuid,msg){
		return $http.put('http://maximumstock.net/schwarmlernen/api/v1/targets/'+uuid+'/globalconfig',msg)
	}
	
	this.getGlobalConfig=  function(uuid){
		return $http.get('http://maximumstock.net/schwarmlernen/api/v1/targets/'+uuid+'/globalconfig')
	}

	this.getNodesByRef=  function(link){
		return $http.get(link)
	}
	
	
	this.postTarget= function(msg,uuid){ 
		return $http.post("http://maximumstock.net/schwarmlernen/api/v1/targets/"+uuid+"/targets",msg)
  	}
  	
  	this.postMainTarget= function(msg){ 
		return $http.post("http://maximumstock.net/schwarmlernen/api/v1/targets",msg)
  	}
  	
  	this.getSelf= function(){ 
		return $http.get("http://maximumstock.net/schwarmlernen/api/v1/self")
		.then(function(response) {
			return response
  		},function(response) {
			console.log(response.data);
  		});
  	}
  	
  	
  	this.postTask= function(msg,uuid){ 
		return $http.post("http://maximumstock.net/schwarmlernen/api/v1/targets/"+uuid+"/tasks",msg)
  	}
  	
  	this.postInfo= function(msg,uuid){
		return $http.post("http://maximumstock.net/schwarmlernen/api/v1/targets/"+uuid+"/infos",msg)
  	}
  	
  	this.postSolution= function(msg,uuid){
		return $http.post("http://maximumstock.net/schwarmlernen/api/v1/tasks/"+uuid+"/solutions",msg)
  	}
  	
	this.createUser= function(msg,uuid){ 
		return $http.put("http://maximumstock.net/schwarmlernen/api/v1/targets/"+uuid+"/users",msg)
  	}
  	
  	this.deleteTask= function(uuid){ 
		return $http.put("http://maximumstock.net/schwarmlernen/api/v1/tasks/"+uuid+"/status")
  	}
  	
  	this.deleteSolution= function(uuid){ 
		return $http.put("http://maximumstock.net/schwarmlernen/api/v1/solutions/"+uuid+"/status")
  	}
  	
  	this.deleteInfo= function(uuid){ 
		return $http.put("http://maximumstock.net/schwarmlernen/api/v1/infos/"+uuid+"/status")
  	}
  	
  	//Saves Hash of User in Cookies
  	this.saveUserToken= function(msg){ 
		return $http.post('http://maximumstock.net/schwarmlernen/api/v1/login',msg)
		.then(function(response) {
			console.log(response.data);
			$cookies.put('X-Access-Token',response.data.token);
			$cookies.put('isAdmin',response.data.admin);
			alert("Angemeldet: "+response.data.success);
			return response.data;
  		});
  	}
  	
  	//Deletes Hash of User in Cookies
  	this.deleteUserToken= function(){ 
		$cookies.remove('X-Access-Token');
		$cookies.remove('isAdmin');
  	}
  	
}]);



