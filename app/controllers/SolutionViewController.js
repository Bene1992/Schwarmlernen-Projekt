var app = angular.module('slApp');

app.controller('SolutionViewController',['$scope','Api','$routeParams','$cookies', function ($scope, Api,$routeParams,$cookies) {

	//entfernt die Buttons fals kein Admin
	var isAdmin = $cookies.get('isAdmin');
	console.log(isAdmin);
		
	if(isAdmin=='false'){
		$('.adminonly').remove();
	}
	
	var uuid = $routeParams.uuid;
	
	$('#head').append("of "+uuid);

}]);