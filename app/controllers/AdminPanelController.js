var app = angular.module('slApp');

app.controller('AdminPanelController',['$scope','Api','$routeParams','$cookies', function ($scope, Api,$routeParams,$cookies) {	

	//entfernt die Buttons fals kein Admin
	var isAdmin = $cookies.get('isAdmin');
	if(isAdmin!='true'){
		$('.adminonly').remove();
	}
	
	//fügt Studiengänge zu Dropdown hinzu
	Api.getAllDegrees()
	.then(function(deg){
		jQuery.each(deg,function(){
		$('#degreeDropdown').append("<option value="+this.properties.uuid+">"+this.properties.name+"</option>");
		
		})
	})
	
	var uuidDegree;
	var uuidConfig;
	
	
	//Zeigt Config Optionen an
	var configview = function(){
		uuidDegree=$('#degreeDropdown').val();
		Api.getConfig(uuidDegree)
		.then(function (config) {
			console.log(config);
			uuidConfig = config.properties.uuid;
			
			$('#packagesize').val(config.properties.packageSize);
			
			//%Anteil
			$('#infoshare').val(config.properties.infoShare);
			$('#taskshare').val(config.properties.taskShare);
			$('#solutionshare').val(config.properties.solutionShare);
			$('#ratingshare').val(config.properties.rateShare);
			
			//Kosten
			$('#infocost').val(config.properties.infoCost);
			$('#taskcost').val(config.properties.taskCost);
			$('#solutioncost').val(config.properties.solutionCost);
			$('#ratingcost').val(config.properties.rateCost);
			
			//Gewinn
			$('#infopoints').val(config.properties.infoPoints);
			$('#taskpoints').val(config.properties.taskPoints);
			$('#solutionpoints').val(config.properties.solutionPoints);
			$('#ratingpoints').val(config.properties.ratePoints);
			
			$('#ratingmulti').val(config.properties.rateMultiplier);
			
			
		})
	
	}
	
	$('#degreeDropdown').change(configview);

	//erstellt Studiengang
	$('#submitStudiengang').click(function () {
		msg= {"name":$('#addStudiengang').val()};
		console.log(Api.postDegree(msg));
	})
	
	//ändert Studiengangconfig
	$('#submitConfig').click(function () {
		msg= {	"infoCost":parseInt($('#infocost').val()),
				"infoPoints": parseInt($('#infopoints').val()),
				"infoShare": parseInt($('#infoshare').val()),
				"packageSize": parseInt($('#packagesize').val()),
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
	
	
	

}]);