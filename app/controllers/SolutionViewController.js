var app = angular.module('slApp');

app.controller('SolutionViewController',['$scope','Api','$routeParams','$cookies', function ($scope, Api,$routeParams,$cookies) {

	//entfernt die Buttons fals kein Admin
	var isAdmin = $cookies.get('isAdmin');
	if(isAdmin!='true'){
		$('.adminonly').remove();
	}
	
	//holt ich uuid der Lösung aus Url
	var uuid = $routeParams.uuid;
	
	//Bildschirmbreite
	var editorwidth = $('.list-group-item').width();
	$('.markupcontainer').width()*0.95
	
	//initialisiert Bewertung
	$("#rating1").rating();
	$("#rating2").rating();
	$("#rating3").rating();
	$("#rating4").rating();
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
   				"names":[	"Ist die Lösung (Arbeitsergebnis) verständlich ?",
   							"Ist die Lösung kurz und knackig ?",
   							"Wie finden Sie die Qualität der Quellen ?",
   							"Empfinden Sie die Lösung hilfreich ?"
   						],
   				"comment":$('#ratingKommi').val()};
   		console.log(msg);
		Api.postRatingOfSolution(msg,uuid)
		.then(function(res){
			alert("Lösung bewertet");
			location.reload();
		})
		.catch(function(res){
			alert("Fehler: "+res.data.message);
		})	
	});
	
	
	//holt sich die Lösung
	Api.getNodesByRef('http://maximumstock.net/schwarmlernen/api/v1/solutions/'+uuid)
	.then (function(sol) {
		$('#head').append("<textarea readonly class='form-control'>"+sol.data.properties.description+"</textarea>");
		$('#head').append("<textarea readonly class='form-control'>"+sol.data.properties.text+"</textarea>");
		$('#head').append("<textarea readonly class='form-control'>"+sol.data.properties.sources+"</textarea>");	
		
		Api.getRatingOfSolution(uuid)
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