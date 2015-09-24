var app = angular.module('slApp');

app.controller('AdminPanelController',['$scope','Api','$routeParams','$cookies', function ($scope, Api,$routeParams,$cookies) {	

	//entfernt die Buttons fals kein Admin
	var isAdmin = $cookies.get('isAdmin');

	if(isAdmin=='false'){
		$('.adminonly').remove();
	}
	

	$('#submitStudiengang').click(function () {
		msg= {"name":$('#addStudiengang').val()};
		console.log(Api.postDegree(msg));
	})

}]);