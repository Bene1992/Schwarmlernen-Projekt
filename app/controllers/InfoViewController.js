var app = angular.module('slApp');

app.controller('InfoViewController',['$scope','Api','$routeParams','$cookies', function ($scope, Api,$routeParams,$cookies) {

	//entfernt die Buttons fals kein Admin
	var isAdmin = $cookies.get('isAdmin');
	if(isAdmin!='true'){
		$('.adminonly').remove();
	}
	
	//holt sich Info uuid aus URL
	var uuid = $routeParams.uuid;
	
	
	//Bildschirmbreite
	var editorwidth = $('.list-group-item').width();
	$('.markupcontainer').width()*0.95
	
	$("#rating1").rating();
	$("#rating2").rating();
	$("#rating3").rating();
	$("#rating4").rating();
	$("#rating5").rating();
	$("#ratingKommi").markItUp(mySettings);
	
	//legt Breite des Editors fest
	$(".markitup").width(editorwidth);
	$("textarea").width($('.markitupcontainer').width()-50);
	
	//fügt Bewertung hinzu
	$('#addRating').click(function() {
   		msg= {	"values":[	parseInt($('#rating1').val()),
   							parseInt($('#rating2').val()),
   							parseInt($('#rating3').val()),
   							parseInt($('#rating4').val())
   						],
   				"names":[	"Ist die Information (Arbeitsergebnis) verständlich ?",
   							"Ist die Information kurz und knackig ?",
   							"Wie finden Sie die Qualität der Quellen ?",
   							"Empfinden Sie die Information hilfreich ?"
   						],
   				"comment":$('#ratingKommi').val()};
   		console.log(msg);
		Api.postRatingOfInfo(msg,uuid)
		.then(function(res){
			alert("Info bewertet");
			location.reload();
		})
		.catch(function(res){
			console.log(res);
		})	
	});
	
	
	//holt sich die Info
	Api.getNodesByRef('http://maximumstock.net/schwarmlernen/api/v1/infos/'+uuid)
	.then (function(info) {
		console.log(info)
		$('#head').append("<textarea readonly class='form-control'>"+info.data.properties.description+"</textarea>");
		$('#head').append("<textarea readonly class='form-control'>"+info.data.properties.text+"</textarea>");
		$('#head').append("<textarea readonly class='form-control'>"+info.data.properties.sources+"</textarea>");
		
		//holt sich die Bewertungen der Info
		Api.getRatingOfInfo(uuid)
		.then(function(rating){
			jQuery.each(rating.data, function() {
				console.log(this)
				var anzahl = this.properties.names.length;
				$('#ratingList').append("<ul id='"+this.properties.uuid+"' style='background-color:grey' class='list-group-item '></ul>");
				for (var i = 0; i < anzahl; i++){
					$("#"+this.properties.uuid).append("<li style='background-color:FFBF00' class='list-group-item '><span class='form-control'>"+this.properties.names[i]+": <b>"+this.properties.values[i]+"</span></li>");
				}
				$("#"+this.properties.uuid).append("<li style='background-color:FFBF00' class='list-group-item '>Kommentar: <textarea readonly class='form-control'>"+this.properties.comment+"</textarea></li>");

			})
			if(isAdmin!='true'){
				$('.adminonly').remove();
			}
		})
		.catch(function(res){
			console.log(res)
			$('#ratingList').append("<ul style='background-color:grey' class='list-group-item '>"+res.data.message+"</ul>");
		})
   	})
}]);