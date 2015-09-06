var app = angular.module('slApp');

app.controller('AnmeldenController',['$scope','Api', function ($scope, Api) {	
	
	var token;
	
	$('#submit').click( function(){
		msg= {"username":$('#username').val(),"password":$('#password').val()};
	
		Api.saveUserToken(msg);
		
	})

}]);