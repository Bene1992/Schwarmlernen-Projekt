var app = angular.module('slApp');

app.controller('LernzielController',['$scope','Api','$cookies', function ($scope, Api,$cookies) {

	//entfernt die Buttons fals kein Admin
	var isAdmin = $cookies.get('isAdmin');

		
	if(isAdmin=='false'){
		$('.adminonly').remove();
	}
    
    //Erstes Listen Element
    $('#listTargets').append("<ul class='list-group ' id= 'root'></ul>");
    
    //liefert auf Klick die jeweils darunter liegenden 	Kinder
    var getChildrenOnClick = function () {
   		var parentID = this.id;
   			$( ".openbutton" ).off("click");
   			
  			Api.getNodesByRef("http://maximumstock.net/schwarmlernen/api/v1/targets/"+this.id+"/children")
			.then (function(children) {
			console.log(children);
			//hängt targets an
			jQuery.each(children.targets, function() {
       			$('#ul'+parentID).append("<li style='background-color:grey' class='list-group-item ' id = 'no-li"+this.properties.uuid+"' >"+this.properties.name+"</li><ul id = 'ul"+this.properties.uuid+"'></ul>");
       			$('#no-li'+this.properties.uuid).append("<button  class='openbutton btn btn-default' id = '"+this.properties.uuid+"'>Open</button>");
       			$('#no-li'+this.properties.uuid).append("<button  class='addbutton btn btn-default' id = 'addToTarget"+this.properties.uuid+"'>Add</button>");
       			$('#no-li'+this.properties.uuid).append("<button  class='adminonly alterbutton btn btn-default' id = 'alter"+this.properties.uuid+"'>Alter</button>");
   			})
   			
   			//Hängt tasks an 
   			jQuery.each(children.tasks, function() {
       			$('#ul'+parentID).append("<li style='background-color:47BCF7' class='list-group-item ' id = 'ta-li"+this.properties.uuid+"' ><a href='/sl/#/task"+this.properties.uuid+"'>"+this.properties.description+"</a></li><ul id = 'ul"+this.properties.uuid+"'></ul>");
       			console.log(this);
       			

   			})
   			
   			 //Hängt infos an 
   			jQuery.each(children.infos, function() {
       			$('#ul'+parentID).append("<li style='background-color:81F79F' class='list-group-item ' id = 'in-li"+this.properties.uuid+"' ><a href='/sl/#/info"+this.properties.uuid+"'>"+this.properties.description+"</a></li><ul id = 'ul"+this.properties.uuid+"'></ul>");

       			
   			})
   			var isAdmin = $cookies.get('isAdmin');
			console.log(isAdmin);
		
			if(isAdmin=='false'){
				$('.adminonly').remove();
			}
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
			console.log(data)
			jQuery.each(data, function() {
				$('#root').append("<li id = 'de-li"+this.properties.uuid+"' class='list-group-item' >"+this.properties.name+"</li><ul id = '"+this.properties.uuid+"'></ul>");
				$('#de-li'+this.properties.uuid).append("<button  class='adminonly addbutton btn btn-default' id = 'addToTarget"+this.properties.uuid+"'>Add</button>");
				var parentID = this.properties.uuid;
				Api.getNodesByRef(this.links.targets)
				.then (function(data2) {
					console.log(data2)
					jQuery.each(data2, function() {
       					$('#'+parentID).append("<li  class='list-group-item ' id = 'no-li"+this.properties.uuid+"' >"+this.properties.name+"</li><ul id = 'ul"+this.properties.uuid+"'></ul>");
       					$('#no-li'+this.properties.uuid).append("<button  class='openbutton btn btn-default' id = '"+this.properties.uuid+"'>Open</button>");
       					$('#no-li'+this.properties.uuid).append("<button  class='addbutton btn btn-default' id = 'addToTarget"+this.properties.uuid+"'>Add</button>");
   					})
   					$( ".openbutton" ).click(getChildrenOnClick);
   					$('.addbutton').click(function(){ window.location = 'http://maximumstock.net/sl/#/'+this.id});
				})
			})
		})							
   	
		
	
	
		
	
}]);
