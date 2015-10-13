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
	
	//fügt die Bewertungen der Bewertungen hinzu
	var rateRating = function(){
		msg= {	"values":[	parseInt($("#rate"+this.id).val())
   						],
   				"names":[	"War die Bewertung hilfreich"
   						],
   				"comment": " "};
   		console.log(msg);
		Api.postRatingOfRating(msg,this.id)
		.then(function(res){
			alert("Bewertung bewertet");
			location.reload();
		})
		.catch(function(res){
			alert("Fehler: "+res.data.message);
		})	
	}
	
	
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
	Api.getNodesByRef('http://ns319046.ip-37-59-6.eu/schwarmlernenapi/api/v1/solutions/'+uuid)
	.then (function(sol) {
		$('#head').append("<textarea readonly class='form-control'>"+sol.data.properties.description+"</textarea>");
		$('#head').append("<textarea readonly class='form-control'>"+sol.data.properties.text+"</textarea>");
		$('#head').append("<textarea readonly class='form-control'>"+sol.data.properties.sources+"</textarea>");	
		
		//holt meine Bewertung der Lösung
		Api.getMyRatingOfSolution(uuid)
		.then(function(rating){
			console.log(rating)
			$('#myratingList').append("<ul id='my"+rating.data.properties.uuid+"' style='background-color:grey' class='list-group-item '></ul>");
			var anzahl = rating.data.properties.names.length;
			for (var i = 0; i < anzahl; i++){
				$("#my"+rating.data.properties.uuid).append("<li style='background-color:FFBF00' class='list-group-item '><span class='form-control'>"+rating.data.properties.names[i]+": <b>"+rating.data.properties.values[i]+"</span></li>");
			}
			$("#my"+rating.data.properties.uuid).append("<li style='background-color:FFBF00' class='list-group-item '>Kommentar: <textarea class='form-control'>"+rating.data.properties.comment+"</textarea></li>");
			$("#my"+rating.data.properties.uuid).append("<li style='background-color:FFBF00' class='list-group-item '>Bewertungen<ul id='myrate"+rating.data.properties.uuid+"' style='background-color:grey' class='list-group-item '></ul></li>");
			Api.getNodesByRef(rating.data.links.ratings)
			.then(function(rate){
				console.log(rate);
				jQuery.each(rate.data, function(){
					console.log(this.properties.values)
					$("#myrate"+rating.data.properties.uuid).append("<li style='background-color:FFBF00' class='list-group-item '><span class='form-control'>"+this.properties.values[0]+"</span></li>");
				})
			})
		})
		.catch(function(res){
			console.log(res)
		})
		
		Api.getRatingOfSolution(uuid)
		.then(function(rating){
			jQuery.each(rating.data, function() {
				console.log(this)
				var anzahl = this.properties.names.length;
				$('#ratingList').append("<ul id='ul"+this.properties.uuid+"' style='background-color:grey' class='list-group-item '></ul>");
				for (var i = 0; i < anzahl; i++){
					$("#ul"+this.properties.uuid).append("<li style='background-color:FFBF00' class='list-group-item '><span class='form-control'>"+this.properties.names[i]+": <b>"+this.properties.values[i]+"</span></li>");
				}
				$("#ul"+this.properties.uuid).append("<li style='background-color:FFBF00' class='list-group-item '>Kommentar: <textarea class='form-control'>"+this.properties.comment+"</textarea></li>");
				$("#ul"+this.properties.uuid).append("<li style='background-color:FFBF00' class='list-group-item '>War die Bewertung hilfreich?<input id='rate"+this.properties.uuid+"' class='rating' data-min='0' data-max='5' data-step='1'></input></li>");
				$("#ul"+this.properties.uuid).append("<li style='background-color:FFBF00' class='list-group-item'><button  class='ratebutton btn btn-default' id = '"+this.properties.uuid+"'>Absenden</button></li>");
				$("#rate"+this.properties.uuid).rating();
				$(".ratebutton").click(rateRating);
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