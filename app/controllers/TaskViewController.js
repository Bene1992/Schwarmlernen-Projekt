var app = angular.module('slApp');

app.controller('TaskViewController',['$scope','Api','$routeParams','$cookies', function ($scope, Api,$routeParams,$cookies) {

	//entfernt die Buttons fals kein Admin
	var isAdmin = $cookies.get('isAdmin');
	console.log(isAdmin);
		
	if(isAdmin=='false'){
		$('.adminonly').remove();
	}
	
	var uuid = $routeParams.uuid;
	
	
	
	Api.getNodesByRef('http://maximumstock.net/schwarmlernen/api/v1/tasks/'+uuid)
	.then (function(task) {
		console.log(task)
		$('#head').append("of "+task.properties.description);
       	$('#TaskView').append("<button  class='addbutton btn btn-default' id = 'addToTask"+task.properties.uuid+"'>Add</button>");
       	$('#TaskView').append("<button  class='alterbutton btn btn-default' id = 'alter"+task.properties.uuid+"'>Alter</button>");
       	console.log(this);
       			
       	//hängt Solutions an Tasks
       	Api.getSolutionsByRef(task.links.solutions)
		.then (function(sol) {
			console.log(sol);
			jQuery.each(sol, function() {
				$('#solutionList').append("<li style='background-color:FFBF00' class='list-group-item ' id = '"+this.properties.uuid+"' ><a href='/sl/#/solution"+this.properties.uuid+"'>"+this.properties.description+"</a></li>");
			})				
		})
		//Leitet auf die AddTo*.hmtl weiter
		$('.addbutton').click(function(){ window.location = 'http://maximumstock.net/sl/#/'+this.id});
   		//Leitet auf die AlterTo*.html weiter
   		$('.alterbutton').click(function(){ window.location = 'http://maximumstock.net/sl/#/'+this.id});	
   	})
   	

}]);