var app = angular.module('slApp');

app.controller('StartseiteController',['$scope','Api','$cookies', function ($scope, Api,$cookies) {	

	//entfernt die Buttons fals kein Admin
	var isAdmin = $cookies.get('isAdmin');
	if(isAdmin!='true'){
		$('.adminonly').remove();
	}



}]);