var app = angular.module('slApp');

app.controller('TaskViewController',['$scope','Api','$routeParams','$cookies', function ($scope, Api,$routeParams,$cookies) {

	//entfernt die Buttons fals kein Admin
	var isAdmin = $cookies.get('isAdmin');
	if(isAdmin!='true'){
		$('.adminonly').remove();
	}
	
	//holt sich die uuid der Aufgabe aus Url
	var uuid = $routeParams.uuid;
	
	$("#rating1").rating();
	$("#rating2").rating();
	$("#rating3").rating();
	$("#rating4").rating();
	$("#ratingKommi").markItUp(mySettings);
	
	//Bildschirmbreite
	var editorwidth = $('.list-group-item').width();
	
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
	
	// fügt Bewertung hinzu
	$('#addRating').click(function() {
   		msg= {	"values":[	parseInt($('#rating1').val()),
   							parseInt($('#rating2').val()),
   							parseInt($('#rating3').val()),
   							parseInt($('#rating4').val())
   						],
   				"names":[	"Ist die Aufgabe (Arbeitsergebnis) verständlich ?",
   							"Ist die Aufgabe kurz und knackig ?",
   							"Wie finden Sie die Qualität der Quellen ?",
   							"Empfinden Sie die Aufgabe hilfreich ?"
   						],
   				"comment":$('#ratingKommi').val()};

   		console.log(msg);
		Api.postRatingOfTask(msg,uuid)
		.then(function(res){
			alert("Aufgabe bewertet");
			location.reload();
		})
		.catch(function(res){
			alert("Fehler: "+res.data.message);
		})	
	});
	
	
	//holt Aufgaben Objekt
	Api.getTask(uuid)
	.then (function(task) {
		console.log(task)
		$('#head').append("<textarea readonly class='form-control'>"+task.data.properties.description+"</textarea>");
		$('#head').append("<textarea readonly class='form-control'>"+task.data.properties.text+"</textarea>");
		$('#head').append("<textarea readonly class='form-control'>"+task.data.properties.sources+"</textarea>");
		
		
		//holt meine Bewertung der Aufgabe
		Api.getMyRatingOfTask(uuid)
		.then(function(rating){
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
		
		//holt sich Bewertungen der Aufgabe
		Api.getRatingOfTask(uuid)
		.then(function(rating){
			jQuery.each(rating.data, function() {
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
       	
       	
       	Api.getNodesByRef(task.data.links.solution)
       	.then(function(sol){
       		$('#mysolutionList').append("<li style='background-color:FFBF00' class='list-group-item ' id = '"+sol.data.properties.uuid+"' ><span class='form-control'><a href='/sl/#/solution"+sol.data.properties.uuid+"'>"+sol.data.properties.description+"</a></span></li>");
       	})	
       	
       	//holt Lösungen
       	Api.getNodesByRef(task.data.links.solutions)
		.then (function(sol) {
			jQuery.each(sol.data, function() {
				$('#solutionList').append("<li style='background-color:FFBF00' class='list-group-item ' id = '"+this.properties.uuid+"' ><span class='form-control'><a href='#/solution"+this.properties.uuid+"'>"+this.properties.description+"</a></span></li>");
			})
			$('#solutionList').append("<li style='background-color:FFBF00' class='list-group-item ' ><textarea  id='description' type='text' class='form-control' placeholder='Ueberschrift' ></textarea></li>");
			$('#solutionList').append("<li style='background-color:FFBF00' class='list-group-item ' ><textarea  id='text' type='text' class='form-control' placeholder='Loesung' ></textarea></li>");
			$('#solutionList').append("<li style='background-color:FFBF00' class='list-group-item ' ><textarea  id='sources' type='text' class='form-control' placeholder='Quellen' ></textarea></li>");

			$('#solutionList').append("<li style='background-color:FFBF00' class='list-group-item ' ><button  class='btn btn-default' id = 'addSolution'>Abgeben</button><button  class='btn btn-default' id = 'saveSolution'>Speichern</button></li>");

			
			$('#addSolution').click(addSolution);
			$('#saveSolution').click(saveSolution);
			
			$("#description").markItUp(mySettings);
			$("#text").markItUp(mySettings);
			$("#sources").markItUp(mySettings);
			
			//legt Breite des Editors fest
			$(".markitup").width(editorwidth);
			$("textarea").width($('.markitupcontainer').width()-50);
		})

		//gibt Lösung ab
    	var addSolution = function (){    
			msg= {	"description":$('#description').val(),
					"text":$('#text').val(),
					"sources":$('#sources').val()
			};
			console.log(msg);
			Api.postSolution(msg,uuid)
			.then(function(res){
				Api.submitSolution(res.data.properties.uuid)
				.then(function(){
					alert("Lösung abgegeben")
					location.reload();
				})
				.catch(function(res){
					alert("Konnte nicht Abgegeben werden, ist aber gespeichert");
					console.log(res)
				})
			})
			.catch(function(res){
				alert("Da lief was schief"+res.data.message);
				console.log(res)
			})
    	}
    	
    	//speichert Lösung
    	var saveSolution = function (){    
			msg= {	"description":$('#description').val(),
					"text":$('#text').val(),
					"sources":$('#sources').val()
			};
			console.log(msg);
			Api.postSolution(msg,uuid)
			.then(function(res){
				alert("Im Konto gespeichert")
				window.location = '#/Konto'
			})
			.catch(function(res){
				alert("Da lief was schief"+res.data.message);
				console.log(res)
			})
    	}
   	})
   	

}]);