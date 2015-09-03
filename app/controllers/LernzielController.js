var app = angular.module('slApp');

app.controller('LernzielController',['$scope','Api', function ($scope, Api) {
    
    //Erstes Listen Element
    $('#listTargets').append("<ul class='list-group ' id= 'root'></ul>");
    
    //liefert auf Klick die jeweils darunter liegenden 	Kinder
    var getChildrenOnClick = function () {
   		var parentID = this.id;
   			$( ".openbutton" ).off("click");
   			
  			Api.getTargetsByRef("http://maximumstock.net/schwarmlernen/api/v1/targets/"+this.id+"/children")
			.then (function(children) {
			console.log(children);
			jQuery.each(children.targets, function() {
       			$('#ul'+parentID).append("<li style='background-color:grey' class='list-group-item ' id = 'no-li"+this.properties.uuid+"' >"+this.properties.uuid+"</li><ul id = 'ul"+this.properties.uuid+"'></ul>");
       			$('#no-li'+this.properties.uuid).append("<button  class='openbutton btn-default' id = '"+this.properties.uuid+"'>Open</button>");
       			$('#no-li'+this.properties.uuid).append("<button  class='addbutton btn-default' id = 'addToNode"+this.properties.uuid+"'>Add</button>");
       			$('#no-li'+this.properties.uuid).append("<button  class='alterbutton btn-default' id = 'alterTo"+this.properties.uuid+"'>Alter</button>");
   			})
   			//$( ".openbutton" ).click(getChildrenOnClick);
   			jQuery.each(children.tasks, function() {
       			$('#ul'+parentID).append("<li style='background-color:47BCF7' class='list-group-item ' id = 'ta-li"+this.properties.uuid+"' >"+this.properties.uuid+"</li><ul id = 'ul"+this.properties.uuid+"'></ul>");
       			$('#ta-li'+this.properties.uuid).append("<button  class='openbutton btn-default' id = '"+this.properties.uuid+"'>Open</button>");
       			$('#ta-li'+this.properties.uuid).append("<button  class='addbutton btn-default' id = 'addToTask"+this.properties.uuid+"'>Add</button>");
       			$('#ta-li'+this.properties.uuid).append("<button  class='alterbutton btn-default' id = 'alterTo"+this.properties.uuid+"'>Alter</button>");
   			})
   			$('.openbutton').click(getChildrenOnClick);
   			//Leitet auf die AddTo*.hmtl weiter
   			$('.addbutton').click(function(){ window.location = 'http://maximumstock.net/sl/#/'+this.id});
   			//Leitet auf die AlterTo*.html weiter
   			$('.alterbutton').click(function(){ window.location = 'http://maximumstock.net/sl/#/'+this.id});	
   		})
   	};
   	
   

	
	//Erstellt Studiengang und Module
	Api.getAllDegrees()
		.then (function(data) {
			jQuery.each(data, function() {
				$('#root').append("<li class='list-group-item' >"+this.properties.name+"</li><ul id = '"+this.properties.uuid+"'></ul>");
				var parentID = this.properties.uuid;
				Api.getTargetsByRef(this.ref+'/targets')
				.then (function(data2) {
					jQuery.each(data2, function() {
       					$('#'+parentID).append("<li  class='list-group-item ' id = 'no-li"+this.properties.uuid+"' >"+this.properties.uuid+"<button  class='openbutton btn-default' id = '"+this.properties.uuid+"'>Open</button></li><ul id = 'ul"+this.properties.uuid+"'></ul>");
   					})
   					$( ".openbutton" ).click(getChildrenOnClick);
				})
			})
		})							
   	
		
	
	
		
	
}]);
