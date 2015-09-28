var app = angular.module('slApp');

app.controller('InfoViewController',['$scope','Api','$routeParams','$cookies', function ($scope, Api,$routeParams,$cookies) {

	//entfernt die Buttons fals kein Admin
	var isAdmin = $cookies.get('isAdmin');
		
	if(isAdmin=='false'){
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
		Api.postRatingOfInfo(uuid,msg)
		.then(function(res){
			//location.reload();
		})	
	});
	
	
	
	Api.getNodesByRef('http://maximumstock.net/schwarmlernen/api/v1/infos/'+uuid)
	.then (function(info) {
		$('#head').append(info.properties.description);
		
		Api.getRatingOfInfo(uuid)
		.then(function(rating){
			jQuery.each(rating.ratings, function() {
				$('#ratingAllList').append("<li style='background-color:FFBF00' class='list-group-item '>"+this.author+"  r1:"+this.r1+",  r2:"+this.r2+","+"  r3:"+this.r3+",  r4:"+this.r4+",  r5:"+this.r5+",  Kommentar:"+this.comment+"  </li>");
			})
		})

		Api.getNodesByRef(info.links.comments)
		.then (function(com) {
			jQuery.each(com, function() {
				$('#commentList').append("<li style='background-color:FFBF00' class='list-group-item ' id = '"+this.properties.uuid+"' >"+this.properties.comment+"</li>");
			})
			$('#commentList').append("<li style='background-color:FFBF00' class='list-group-item ' ><textarea  id='inputComment' type='text' class='form-control' placeholder='Kommentar' ></textarea><button  class='btn btn-default' id = 'addComment'>Add</button>");				
			$('#addComment').click(addComment);
		})


		
   	
    	var addComment = function (){
				msg= {"comment":$('#inputComment').val()};
				Api.postCommentToInfos(msg,uuid)
				.then(function(){
				location.reload();
				})
				
		}

   			
   	})
   	

}]);