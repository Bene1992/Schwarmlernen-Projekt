var app = angular.module('slApp');

app.controller('AddUserController',['$scope','Api','$routeParams','$cookies', function ($scope, Api,$routeParams,$cookies) {

	//entfernt die Buttons fals kein Admin
	var isAdmin = $cookies.get('isAdmin');
		
	if(isAdmin=='false'){
		$('.adminonly').remove();
	}

		var uuid= $routeParams.uuid;

	$('#submit').click( function(){
		var amount = parseInt($('#amount').val())
		msg= {"amount":amount};
		Api.createUser(msg,uuid)
		.then(function (users){
			jQuery.each(users,function () {
				$('#userlist').append("<li style='background-color:grey' class='list-group-item' id='"+this.username+"' >Username: "+this.username+" Passwort: "+this.password+"</li>");
			})
		})
	})

}]);