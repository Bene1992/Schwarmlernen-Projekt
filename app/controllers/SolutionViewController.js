var app = angular.module('slApp');

app.controller('SolutionViewController',['$scope','Api','$routeParams','$cookies', function ($scope, Api,$routeParams,$cookies) {

	//entfernt die Buttons fals kein Admin
	var isAdmin = $cookies.get('isAdmin');
		
	if(isAdmin=='false'){
		$('.adminonly').remove();
	}
	
	var uuid = $routeParams.uuid;
	
	$("#rating").rating();
	
	
	
	$('#rating').on('rating.change', function(event, value, caption) {
   		msg= {"rating":parseInt(value)};
   		Api.postRatingOfSolution(uuid,msg)
   		.then(function(){
   			location.reload();   		
   		})

	});
	
	
	
	Api.getNodesByRef('http://maximumstock.net/schwarmlernen/api/v1/solutions/'+uuid)
	.then (function(sol) {
		$('#head').append("of "+sol.properties.description);
		
		Api.getRatingOfSolution(uuid)
		.then(function(rating){
			$('#head').append(" bewertet mit "+rating.rating+" von 5 Sternen bei "+rating.votes+" Bewertungen");
		})
		console.log(sol);
		Api.getNodesByRef(sol.links.comments)
		.then (function(com) {
			jQuery.each(com, function() {
				$('#commentList').append("<li style='background-color:FFBF00' class='list-group-item ' id = '"+this.properties.uuid+"' >"+this.properties.comment+"</li>");
			})
			$('#commentList').append("<li style='background-color:FFBF00' class='list-group-item ' ><textarea  id='inputComment' type='text' class='form-control' placeholder='Kommentar' ></textarea><button  class='btn btn-default' id = 'addComment'>Add</button>");				
			$('#addComment').click(addComment);
		})


		
   	
    	var addComment = function (){
				msg= {"comment":$('#inputComment').val()};
				Api.postCommentToSolutions(msg,uuid)
				.then(function(){
				location.reload();
				})
				
		}

   			
   	})
   	

}]);