var app = angular.module('slApp');

app.controller('UserController',['$scope','Api','$routeParams', function ($scope, Api,$routeParams) {

	Api.getAllUsers()
	.then(function(users){
		jQuery.each(users,function () {
			$('#userlist').append("<li style='background-color:grey' class='list-group-item ' >"+this.properties.username+"</li>");
		})
	})
	
	
	$('#submit').click( function(){
		msg= {"username":$('#username').val(),"password":$('#password').val()};
		console.log(msg);
		Api.createUser(msg);
	})
	
	












}]);