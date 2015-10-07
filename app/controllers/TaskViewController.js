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
	Api.getNodesByRef('http://maximumstock.net/schwarmlernen/api/v1/tasks/'+uuid)
	.then (function(task) {
		$('#head').append("<textarea readonly class='form-control'>"+task.data.properties.description+"</textarea>");
		$('#head').append("<textarea readonly class='form-control'>"+task.data.properties.text+"</textarea>");
		$('#head').append("<textarea readonly class='form-control'>"+task.data.properties.sources+"</textarea>");
		
		console.log(task)
		
		//holt sich Bewertungen der Aufgabe
		Api.getRatingOfTask(uuid)
		.then(function(rating){
			jQuery.each(rating.data, function() {
				console.log(this)
				var anzahl = this.properties.names.length;
				$('#ratingList').append("<ul id='"+this.properties.uuid+"' style='background-color:grey' class='list-group-item '></ul>");
				for (var i = 0; i < anzahl; i++){
					$("#"+this.properties.uuid).append("<li style='background-color:FFBF00' class='list-group-item '><span class='form-control'>"+this.properties.names[i]+": <b>"+this.properties.values[i]+"</span></li>");
				}
				$("#"+this.properties.uuid).append("<li style='background-color:FFBF00' class='list-group-item '>Kommentar: <textarea class='form-control'>"+this.properties.comment+"</textarea></li>");

			})
			if(isAdmin!='true'){
				$('.adminonly').remove();
			}
		})
		.catch(function(res){
			console.log(res)
			$('#ratingList').append("<ul style='background-color:grey' class='list-group-item '>"+res.data.message+"</ul>");
		})
       			
       	//holt Lösungen
       	Api.getNodesByRef(task.data.links.solutions)
		.then (function(sol) {
			jQuery.each(sol.data, function() {
				$('#solutionList').append("<li style='background-color:FFBF00' class='list-group-item ' id = '"+this.properties.uuid+"' ><span class='form-control'><a href='/sl/#/solution"+this.properties.uuid+"'>"+this.properties.description+"</a></span></li>");
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
				window.location = 'http://maximumstock.net/sl/#/Konto'
			})
			.catch(function(res){
				alert("Da lief was schief"+res.data.message);
				console.log(res)
			})
    	}
   	})
   	

}]);