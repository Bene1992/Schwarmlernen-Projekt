var app = angular.module('slApp');

app.controller('AddUserController',['$scope','Api','$routeParams','$cookies', function ($scope, Api,$routeParams,$cookies) {

	//entfernt die Buttons fals kein Admin
	var isAdmin = $cookies.get('isAdmin');
	if(isAdmin!='true'){
		$('.adminonly').remove();
	}

	//holt sich uuid des Studiengangs zu dem User hinzugefügt werden sollen aus URL
	var uuid= $routeParams.uuid;

	//erzeugt User und zeigt Passwort mit Username 
	$('#submit').click( function(){
		var amount = parseInt($('#amount').val())
		if (amount<100){
			msg= {"amount":amount};
			Api.createUser(msg,uuid)
			.then(function (users){
				jQuery.each(users.data,function () {
					$('#userlist').append("<li style='background-color:grey' class='list-group-item' id='"+this.username+"' ><span class='form-control'>Username: "+this.username+" Passwort: "+this.password+"</li>");
				})
			})
			.catch(function(res){
				alert(res.data.message);
			})
		}
		if (amount>100){
			alter("Zu viele User");
		}
	})

}]);