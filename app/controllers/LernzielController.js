var app = angular.module('slApp');

app.controller('LernzielController',['$scope','$http','Api', function ($scope,$http, Api) {
    
    //Erstes Listen Element
    $('#listTargets').append("<ul class='list-group ' id= 'root'></ul>");
    
    //liefert auf Klick die jeweils darunter liegenden 	Kinder
    var getChildrenOnClick = function () {
   		var parentID = this.id;
  			Api.getTargetsByRef("http://maximumstock.net/schwarmlernen/api/v1/targets/"+this.id+"/children")
			.then (function(children) {
			jQuery.each(children.targets, function() {
       			$('#ul'+parentID).append("<li style='background-color:grey' class='list-group-item ' id = 'li"+this.properties.uuid+"' >"+this.properties.uuid+"<button  class='openbutton btn-default' id = '"+this.properties.uuid+"'>Open</button></li><ul id = 'ul"+this.properties.uuid+"'></ul>");
       			console.log("1");
   			})
   			//$( ".openbutton" ).click(getChildrenOnClick);
   			jQuery.each(children.tasks, function() {
       			$('#ul'+parentID).append("<li style='background-color:47BCF7' class='list-group-item ' id = 'li"+this.properties.uuid+"' >"+this.properties.uuid+"<button  class='openbutton btn-default' id = '"+this.properties.uuid+"'>Open</button></li><ul id = 'ul"+this.properties.uuid+"'></ul>");
       			//console.log("1");
   			})
   			$( ".openbutton" ).click(getChildrenOnClick);
   		})
   	};

	
	//Erstellt Studiengang, Module und meldet Funktion an
	Api.getAllDegrees()
		.then (function(data) {
			jQuery.each(data, function() {
				$('#root').append("<li class='list-group-item' >"+this.properties.name+"</li><ul id = '"+this.properties.uuid+"'></ul>");
				var parentID = this.properties.uuid;
				Api.getTargetsByRef(this.ref+'/targets')
				.then (function(data2) {
					jQuery.each(data2, function() {
       					$('#'+parentID).append("<li  class='list-group-item ' id = 'li"+this.properties.uuid+"' >"+this.properties.uuid+"<button  class='openbutton btn-default' id = '"+this.properties.uuid+"'>Open</button></li><ul id = 'ul"+this.properties.uuid+"'></ul>");
   					})
   					$( ".openbutton" ).click(getChildrenOnClick);
				})
			})
		})							
   	
		
	
	
		
	
}]);
