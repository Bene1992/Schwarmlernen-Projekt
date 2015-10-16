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
	Api.getInfo(uuid)
	.then (function(info) {
		console.log(info)
		$('#head').append("<div style='height:auto' readonly class='form-control'>"+info.data.properties.description+"</div>");
		$('#head').append("<div style='height:auto' readonly class='form-control'>"+info.data.properties.text+"</div>");
		$('#head').append("<div style='height:auto' readonly class='form-control'>"+info.data.properties.sources+"</div>");
		
		//holt meine Bewertung der Aufgabe
		Api.getMyRatingOfInfo(uuid)
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
		
		
		//holt sich die Bewertungen der Info
		Api.getRatingOfInfo(uuid)
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