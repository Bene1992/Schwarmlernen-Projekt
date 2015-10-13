var app = angular.module('slApp');

app.controller('AdminPanelController',['$scope','Api','$routeParams','$cookies', function ($scope, Api,$routeParams,$cookies) {	

	//entfernt die Buttons fals kein Admin
	var isAdmin = $cookies.get('isAdmin');
	if(isAdmin!='true'){
		$('.adminonly').remove();
	}
	
	var configLink;
	var uuidConfig;
	var uuidDegree;
	
	//fügt Studiengänge zu Dropdown hinzu
	Api.getAllTargets()
	.then(function(deg){
		console.log(deg)
		jQuery.each(deg.data,function(){
			$('#degreeDropdown').append("<option value="+this.links.globalconfig+">"+this.properties.name+"</option>");
		})
	})
	

	
	
	//Zeigt Config Optionen an
	var configview = function(){
		configLink=$('#degreeDropdown').val();
		Api.getNodesByRef(configLink)
		.then(function (config) {
			console.log(config)
			uuidDegree = config.data.properties.parent;
			uuidConfig = config.data.properties.uuid;
			
			$('#packagesize').val(config.data.properties.packageSize);
			
			//%Anteil
			$('#infoshare').val(config.data.properties.infoShare);
			$('#taskshare').val(config.data.properties.taskShare);
			$('#solutionshare').val(config.data.properties.solutionShare);
			$('#ratingshare').val(config.data.properties.rateShare);
			
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
	}
	
	$('#degreeDropdown').change(configview);


	
	//ändert Studiengangconfig
	$('#submitConfig').click(function () {
		msg= {	
				"infoShare": 		parseInt($('#infoshare').val()),
				"packageSize": 		parseInt($('#packagesize').val()),
				"rateShare": 		parseInt($('#ratingshare').val()),
				"solutionShare": 	parseInt($('#solutionshare').val()),
				"taskShare": 		parseInt($('#taskshare').val()),
				"infoCost":			parseInt($('#infocost').val()),
				"taskCost":			parseInt($('#taskcost').val()),
				"solutionCost":		parseInt($('#solutioncost').val()),
				"ratingCost":		parseInt($('#ratingcost').val()),
				"infoPoints":		parseInt($('#infopoints').val()),
				"infoMaxPoints":	parseInt($('#infomaxpoints').val()),
				"taskPoints":		parseInt($('#taskpoints').val()),
				"taskMaxPoints":	parseInt($('#taskmaxpoints').val()),
				"solutionPoints":	parseInt($('#solutionpoints').val()),
				"solutionMaxPoints":parseInt($('#solutionmaxpoints').val()),
				"ratePoints":		parseInt($('#ratepoints').val()),
				"uuid": 			uuidConfig};
		Api.postGlobalConfig(uuidDegree,msg)
		.then(function(res){
			console.log(res);
			configview();
			alert("Erfolg");
		})
		.catch(function(res){
			console.log(res);
		})
		
	})
	
	//erstellt Studiengang
	$('#submitStudiengang').click(function () {
		msg= {"name":$('#addStudiengang').val()};
		Api.postMainTarget(msg)
		.then(function(res){
			console.log(res);
			window.location = '#/Lernziele';
		})
		.catch(function(res){
			alert(res);
		})
	})
	
	
	

}]);