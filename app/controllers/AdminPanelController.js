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
		jQuery.each(deg.data,function(){
			$('#degreeDropdown').append("<option value="+this.links.config+">"+this.properties.name+"</option>");
		})
	})
	

	
	
	//Zeigt Config Optionen an
	var configview = function(){
		configLink=$('#degreeDropdown').val();
		Api.getNodesByRef(configLink)
		.then(function (config) {
			console.log(config);
			uuidDegree = config.data.properties.parent;
			uuidConfig = config.data.properties.uuid;
			
			$('#packagesize').val(config.data.properties.packageSize);
			
			//%Anteil
			$('#infoshare').val(config.data.properties.infoShare);
			$('#taskshare').val(config.data.properties.taskShare);
			$('#solutionshare').val(config.data.properties.solutionShare);
			$('#ratingshare').val(config.data.properties.rateShare);			
		})
	
	}
	
	$('#degreeDropdown').change(configview);

	//erstellt Studiengang
	$('#submitStudiengang').click(function () {
		msg= {"name":$('#addStudiengang').val()};
		Api.postMainTarget(msg)
		.then(function(res){
			console.log(res);
			window.location = 'http://maximumstock.net/sl/#/Lernziele';
		})
		.catch(function(res){
			alert(res);
		})
	})
	
	//ändert Studiengangconfig
	$('#submitConfig').click(function () {
		msg= {	
				"infoShare": parseInt($('#infoshare').val()),
				"packageSize": parseInt($('#packagesize').val()),
				"rateShare": parseInt($('#ratingshare').val()),
				"solutionShare": parseInt($('#solutionshare').val()),
				"taskShare": parseInt($('#taskshare').val()),
				"uuid": uuidConfig};
		Api.postConfig(uuidDegree,msg)
		.then(function(){
			configview();
			alert("Erfolg");
		})
		
	})
	
	
	

}]);