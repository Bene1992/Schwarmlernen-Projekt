var app = angular.module('slApp');

app.controller('TaskViewController',['$scope','Api','$routeParams','$cookies', function ($scope, Api,$routeParams,$cookies) {

	//entfernt die Buttons fals kein Admin
	var isAdmin = $cookies.get('isAdmin');
		
	if(isAdmin=='false'){
		$('.adminonly').remove();
	}
	
	var uuid = $routeParams.uuid;
	
	$("#rating").rating();
	
	
	
	$('#rating').on('rating.change', function(event, value, caption) {
   		msg= {"rating":parseInt(value)};
   		Api.postRatingOfTask(uuid,msg)
   		.then(function(){
   		   	location.reload();
   		})

	});
	
	
	
	Api.getNodesByRef('http://maximumstock.net/schwarmlernen/api/v1/tasks/'+uuid)
	.then (function(task) {
		$('#head').append(task.properties.description);
		Api.getRatingOfTask(uuid)
		.then(function(rating){
			$('#head').append(" bewertet mit "+rating.rating+" von 5 Sternen bei "+rating.votes+" Bewertungen");
		})
       			
       	//hängt Solutions an Tasks
       	Api.getNodesByRef(task.links.solutions)
		.then (function(sol) {
			jQuery.each(sol, function() {
				$('#solutionList').append("<li style='background-color:FFBF00' class='list-group-item ' id = '"+this.properties.uuid+"' ><a href='/sl/#/solution"+this.properties.uuid+"'>"+this.properties.description+"</a></li>");
			})
			$('#solutionList').append("<li style='background-color:FFBF00' class='list-group-item ' ><textarea  id='inputSolution' type='text' class='form-control' placeholder='Loesung' ></textarea><button  class='btn btn-default' id = 'addSolution'>Add</button>");
			$('#addSolution').click(addSolution);				
		})

		
		
		Api.getNodesByRef(task.links.comments)
		.then (function(com) {
			jQuery.each(com, function() {
				$('#commentList').append("<li style='background-color:FFBF00' class='list-group-item ' id = '"+this.properties.uuid+"' >"+this.properties.comment+"</li>");
			})
			$('#commentList').append("<li style='background-color:FFBF00' class='list-group-item ' ><textarea  id='inputComment' type='text' class='form-control' placeholder='Kommentar' ></textarea><button  class='btn btn-default' id = 'addComment'>Add</button>");				
			$('#addComment').click(addComment);
		})


		
   	
    	var addComment = function (){
				msg= {"comment":$('#inputComment').val()};
				Api.postCommentToTasks(msg,uuid)
				.then(function(){
				location.reload();
				})
				
		}

    	var addSolution = function (){    
				msg= {"description":$('#inputSolution').val()};
				console.log(msg);
				Api.postSolution(msg,uuid)
				.then(function(){
				location.reload();
				})
    	}
   			
   	})
   	

}]);