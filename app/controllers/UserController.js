var app = angular.module('slApp');

app.controller('UserController',['$scope','Api','$routeParams','$cookies', function ($scope, Api,$routeParams,$cookies) {

	//entfernt die Buttons fals kein Admin
	var isAdmin = $cookies.get('isAdmin');
	console.log(isAdmin);
		
	if(isAdmin=='false'){
		$('.adminonly').remove();
	}

	Api.getAllUsers()
	.then(function(users){
		jQuery.each(users,function () {
			$('#userlist').append("<li style='background-color:grey' class='list-group-item ' >Username: "+this.properties.username+"</li>");
		})
	})
	
	
	$('#submit').click( function(){
		msg= {"username":$('#username').val(),"password":$('#password').val()};
		console.log(msg);
		Api.createUser(msg);
	})
	
	












}]);