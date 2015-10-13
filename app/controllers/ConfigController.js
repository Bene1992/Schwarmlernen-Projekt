var app = angular.module('slApp');

app.controller('ConfigController',['$scope','Api','$routeParams','$cookies', function ($scope, Api,$routeParams,$cookies) {

	var uuid = $routeParams.uuid;
	var uuidConfig, uuidDegree;
	
	//holt Lernzielconfig
	Api.getTarget(uuid)
	.then(function(target){
		console.log(target);
		console.log(target.data.links.config)
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
			$('#infomaxpoints').val(config.data.properties.infoMaxPoints);
			
			$('#taskpoints').val(config.data.properties.taskPoints);
			$('#taskmaxpoints').val(config.data.properties.taskMaxPoints);
			
			$('#solutionpoints').val(config.data.properties.solutionPoints);
			$('#solutionmaxpoints').val(config.data.properties.solutionMaxPoints);
			
			$('#ratepoints').val(config.data.properties.ratePoints);
		})
		.catch(function(res){
			console.log(res)
		})
	})

	//ändert Studiengangconfig
	$('#submitConfig').click(function () {
		msg= {	
				"rateCost": 		parseInt($('#ratingcost').val()),
				"ratePoints": 		parseInt($('#ratepoints').val()),
				
				"infoCost": 		parseInt($('#infocost').val()),
				"infoPoints":		parseInt($('#infopoints').val()),
				"infoMaxPoints":	parseInt($('#infomaxpoints').val()),
				
				"solutionCost": 	parseInt($('#solutioncost').val()),
				"solutionPoints": 	parseInt($('#solutionpoints').val()),
				"solutionMaxPoints":parseInt($('#solutionmaxpoints').val()),
				
				"taskCost": 		parseInt($('#taskcost').val()),
				"taskPoints": 		parseInt($('#taskpoints').val()),
				"taskMaxPoints":	parseInt($('#taskmaxpoints').val()),
			};
		console.log(msg);
		Api.postConfig(uuidDegree,msg)
		.then(function(res){
			console.log(res);
			//window.location.reload();
		})
		.catch(function(res){
			console.log(res);
		})
		
	})

}])
