var app = angular.module('slApp');

app.controller('ConfigController',['$scope','Api','$routeParams','$cookies', function ($scope, Api,$routeParams,$cookies) {

	var uuid = $routeParams.uuid;
	var uuidConfig, uuidDegree;
	
	//holt Lernzielconfig
	Api.getTarget(uuid)
	.then(function(target){
		console.log(target);
		Api.getNodesByRef(target.data.links.config)
		.then(function(config){
			console.log(config);
			uuidConfig = config.data.properties.uuid;
			uuidDegree = config.data.properties.parent;
			//Kosten
			$('#infocost').val(config.data.properties.infoCost);
			$('#taskcost').val(config.data.properties.taskCost);
			$('#solutioncost').val(config.data.properties.solutionCost);
			$('#ratingcost').val(config.data.properties.rateCost);
			
			//Gewinn
			$('#infopoints').val(config.data.properties.infoPoints);
			$('#taskpoints').val(config.data.properties.taskPoints);
			$('#solutionpoints').val(config.data.properties.solutionPoints);
			$('#ratingpoints').val(config.data.properties.ratePoints);
			
			$('#ratingmulti').val(config.data.properties.rateMultiplier);
		})
	})

	//ändert Studiengangconfig
	$('#submitConfig').click(function () {
		msg= {	
				"rateCost": parseInt($('#ratingcost').val()),
				"rateMultiplier": parseInt($('#ratingmulti').val()),
				"ratePoints": parseInt($('#ratingpoints').val()),
				"rateShare": parseInt($('#ratingshare').val()),
				"solutionCost": parseInt($('#solutioncost').val()),
				"solutionPoints": parseInt($('#solutionpoints').val()),
				"solutionShare": parseInt($('#solutionshare').val()),
				"taskCost": parseInt($('#taskcost').val()),
				"taskPoints": parseInt($('#taskpoints').val()),
				"taskShare": parseInt($('#taskshare').val()),
				"uuid": uuidConfig};
		Api.postConfig(uuidDegree,msg)
		.then(function(){
			configview();
		})
		
	})

}])
