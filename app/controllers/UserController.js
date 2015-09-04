var app = angular.module('slApp');

app.controller('UserController',['$scope','Api','$routeParams', function ($scope, Api,$routeParams) {

	Api.getAllUsers()
	.then(function(users){
		jQuery.each(users,function () {
			console.log("1");
			$('#userlist').append("<li style='background-color:grey' class='list-group-item ' >"+this.properties.uuid+"</li>");
		})
	})
	
	
	$('#submit').click( function(){
		msg= {"username":$('#username').val()};
		console.log(msg);
		Api.createUser(msg);
	})
	
	












}]);