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
	
	var url = 'http://ns319046.ip-37-59-6.eu/schwarmlernenapi/api/v1'

	this.getAllTargets=  function(){
		return $http.get(url+'/targets')
	}
	
	this.getTarget= function(uuid){
		return $http.get(url+'/targets/'+uuid)
	}
	
	this.getTask= function(uuid){
		return $http.get(url+'/tasks/'+uuid)
	}
	
	this.getInfo= function(uuid){
		return $http.get(url+'/infos/'+uuid)
	}
	
	this.getSolution= function(uuid){
		return $http.get(url+'/solutions/'+uuid)
	}
	
	this.saveTask= function(uuid,msg){
		return $http.put(url+'/tasks/'+uuid,msg)
	}
	
	this.saveInfo= function(uuid,msg){
		return $http.put(url+'/infos/'+uuid,msg)
	}
	
	this.saveSolution= function(uuid,msg){
		return $http.put(url+'/solutions/'+uuid,msg)
	}
	
	this.submitTask= function(uuid){
		return $http.put(url+'/tasks/'+uuid+'/submit')
	}
	
	this.submitInfo= function(uuid){
		return $http.put(url+'/infos/'+uuid+'/submit')
	}
	
	this.submitSolution= function(uuid){
		return $http.put(url+'/solutions/'+uuid+'/submit')
	}
	
	
	this.getRatingOfTask=  function(uuid){
		return $http.get(url+'/tasks/'+uuid+'/ratings')
	}
	
	this.getMyRatingOfTask=  function(uuid){
		return $http.get(url+'/tasks/'+uuid+'/rating')
	}
	
	this.postRatingOfTask=  function(msg,uuid){
		return $http.post(url+'/tasks/'+uuid+'/ratings',msg)
	}
	
	this.getRatingOfSolution=  function(uuid){
		return $http.get(url+'/solutions/'+uuid+'/ratings')
	}
	
	this.getMyRatingOfSolution=  function(uuid){
		return $http.get(url+'/solutions/'+uuid+'/rating')
	}
	
	this.postRatingOfSolution=  function(msg,uuid){
		return $http.post(url+'/solutions/'+uuid+'/ratings',msg)
	}
	
	this.getRatingOfInfo=  function(uuid){
		return $http.get(url+'/infos/'+uuid+'/ratings')
	}
	
	this.getMyRatingOfInfo=  function(uuid){
		return $http.get(url+'/infos/'+uuid+'/rating')
	}
	
	this.postRatingOfInfo=  function(msg,uuid){
		return $http.post(url+'/infos/'+uuid+'/ratings',msg)
	}
	
	this.postRatingOfRating=  function(msg,uuid){
		return $http.post(url+'/ratings/'+uuid+'/ratings',msg)
	}
	
	this.postConfig=  function(uuid,msg){
		console.log(url+'/targets/'+uuid+'/config')
		return $http.put(url+'/targets/'+uuid+'/config',msg)
	}
	
	this.getConfig=  function(uuid){
		console.log(url+'/targets/'+uuid+'/config')
		return $http.get(url+'/targets/'+uuid+'/config')
	}
	
	this.postGlobalConfig=  function(uuid,msg){
		return $http.put(url+'/targets/'+uuid+'/globalconfig',msg)
	}
	
	this.getGlobalConfig=  function(uuid){
		return $http.get(url+'/targets/'+uuid+'/globalconfig')
	}

	this.getNodesByRef=  function(link){
		return $http.get(link)
	}
	
	
	this.postTarget= function(msg,uuid){ 
		return $http.post(url+"/targets/"+uuid+"/targets",msg)
  	}
  	
  	this.postMainTarget= function(msg){ 
		return $http.post(url+"/targets",msg)
  	}
  	
  	this.getSelf= function(){ 
		return $http.get(url+"/self")
		.then(function(response) {
			return response
  		},function(response) {
			console.log(response.data);
  		});
  	}
  	
  	
  	this.postTask= function(msg,uuid){ 
		return $http.post(url+"/targets/"+uuid+"/tasks",msg)
  	}
  	
  	this.postInfo= function(msg,uuid){
		return $http.post(url+"/targets/"+uuid+"/infos",msg)
  	}
  	
  	this.postSolution= function(msg,uuid){
		return $http.post(url+"/tasks/"+uuid+"/solutions",msg)
  	}
  	
	this.createUser= function(msg,uuid){ 
		return $http.put(url+"/targets/"+uuid+"/users",msg)
  	}
  	
  	this.deleteTask= function(uuid){ 
		return $http.put(url+"/tasks/"+uuid+"/status")
  	}
  	
  	this.deleteSolution= function(uuid){ 
		return $http.put(url+"/solutions/"+uuid+"/status")
  	}
  	
  	this.deleteInfo= function(uuid){ 
		return $http.put(url+"/infos/"+uuid+"/status")
  	}
  	
  	//Saves Hash of User in Cookies
  	this.saveUserToken= function(msg){ 
		return $http.post(url+'/login',msg)
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
		window.location = '#/Lernziele'
  	}
  	
}]);



