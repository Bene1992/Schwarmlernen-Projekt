var app = angular.module('slApp');

app.controller('AddModulController',['$scope','Api','$routeParams','$cookies', function ($scope, Api,$routeParams,$cookies) {	

	var uuid = $routeParams.uuid;
	var selectedType = $('#typeselect').val();
	
	
	
	//entfernt die Buttons fals kein Admin
	var isAdmin = $cookies.get('isAdmin');

	if(isAdmin=='false'){
		$('.adminonly').remove();
	}
	
	
	$('#submitModul').click(function () {
		msg= {"name":$('#addModul').val()};
		console.log(Api.postModul(msg,uuid));
		window.location = 'http://maximumstock.net/sl/#/Lernziele'
	})

}]);