var app = angular.module('slApp');

app.controller('AbmeldenController',['$scope','Api','$cookies', function ($scope, Api,$cookies) {	

	//entfernt die Buttons fals kein Admin
	var isAdmin = $cookies.get('isAdmin');
	console.log(isAdmin);
		
	if(isAdmin!='true'){
		$('.adminonly').remove();
	}

	Api.deleteUserToken();

}]);