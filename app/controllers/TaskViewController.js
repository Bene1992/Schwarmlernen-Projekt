var app = angular.module('slApp');

app.controller('TaskViewController',['$scope','Api','$routeParams','$cookies', function ($scope, Api,$routeParams,$cookies) {

	//entfernt die Buttons fals kein Admin
	var isAdmin = $cookies.get('isAdmin');
		
	if(isAdmin!='true'){
		$('.adminonly').remove();
	}
	
	var uuid = $routeParams.uuid;
	
	$("#rating1").rating();
	$("#rating2").rating();
	$("#rating3").rating();
	$("#rating4").rating();
	$("#rating5").rating();
	
	
	
	$('#addRating').click(function() {
   		msg= {"r1":parseInt($('#rating1').val()),"r2":parseInt($('#rating2').val()),"r3":parseInt($('#rating3').val()),"r4":parseInt($('#rating4').val()),"r5":parseInt($('#rating5').val()),"comment":$('#ratingKommi').val()};
   		console.log(msg);
   		console.log(uuid)
		Api.postRatingOfTask(msg,uuid)
		.then(function(res){
			location.reload();
		})	
	});
	
	
	
	Api.getNodesByRef('http://maximumstock.net/schwarmlernen/api/v1/tasks/'+uuid)
	.then (function(task) {
		$('#head').append(task.properties.description);
		Api.getRatingOfTask(uuid)
		.then(function(rating){
			jQuery.each(rating.ratings, function() {
				$('#ratingAllList').append("<li style='background-color:FFBF00' class='list-group-item '>"+this.author+"  r1:"+this.r1+",  r2:"+this.r2+","+"  r3:"+this.r3+",  r4:"+this.r4+",  r5:"+this.r5+",  Kommentar:"+this.comment+"  </li>");
			})
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