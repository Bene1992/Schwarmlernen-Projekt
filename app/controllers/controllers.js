var app = angular.module('slApp');

var refDegree='';
var childrenTargets = [];

app.controller('easyController',['$scope','$http','Api', function ($scope,$http, Api) {

	
	
	Api.getAllDegrees()
		.then (function(data) {
			$scope.Degree = data[0].properties.name;
			Api.getDegreeBy(data[0].properties.uuid)
				.then (function(data2) {
					refDegree = data2.ref;
					$scope.Ref = data2.ref; 
				}).then (function() {
					Api.getTargetsByRef(refDegree+'/targets')
					.then (function(data3) {
						console.log(data3);
						$scope.Targets=data3;
					})
				})
			})
	
	
		
	
}]);
