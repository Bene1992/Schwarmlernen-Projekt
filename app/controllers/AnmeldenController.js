var app = angular.module('slApp');

app.controller('AnmeldenController',['$scope','Api','$cookies', function ($scope, Api,$cookies) {	

	//entfernt die Buttons fals kein Admin
	var isAdmin = $cookies.get('isAdmin');
	console.log(isAdmin);
		
	if(isAdmin!='true'){
		$('.adminonly').remove();
	}
	
	var token;
	
	$('#submit').click( function(){
		msg= {"username":$('#username').val(),"password":$('#password').val()};
	
		Api.saveUserToken(msg);
		
	})

}]);