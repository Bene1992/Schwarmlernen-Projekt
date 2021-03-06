var app = angular.module('slApp');

app.controller('SolutionUnfinishedController',['$scope','Api','$routeParams','$cookies', function ($scope, Api,$routeParams,$cookies) {

	//entfernt die Buttons fals kein Admin
	var isAdmin = $cookies.get('isAdmin');
	if(isAdmin!='true'){
		$('.adminonly').remove();
	}
	
	//holt sich die uuid der Aufgabe aus Url
	var uuid = $routeParams.uuid;
	
	//Bildschirmbreite
	var editorwidth = $('.list-group-item').width();
	
	
	//initialisiert Texteditor
	$("#description").markItUp(mySettings);
	$("#text").markItUp(mySettings);
	$("#sources").markItUp(mySettings);
	
	//legt Breite des Editors fest
	$(".markitup").width(editorwidth);
	$("textarea").width($('.markitupcontainer').width()-50);
	
	//holt gespeicherte Daten
	Api.getSolution(uuid)
	.then(function(solution){
		console.log(solution)
		$("#description").val(solution.data.properties.description);
		$("#text").val(solution.data.properties.text);
		$("#sources").val(solution.data.properties.sources);
	})
	.catch(function(res){
		console.log(res)
		alert("Ups");
	})
	
	//Speichert Änderungen
	$('#save').click(function(){
		msg= {	"description":$('#description').val(),
				"text":$("#text").val(),
				"sources":$("#sources").val()
		};
		Api.saveSolution(uuid,msg)
		.then(function(){
			alert("Gespeichert");
			location.reload();
		})
		.catch(function(res){
			console.log(res)
			alert("Da lief was schief: "+res.data[0].message)
		})
	})
	
	//gibt die Aufgabe ab
	$('#submit').click(function(){
		msg= {	"description":$('#description').val(),
				"text":$("#text").val(),
				"sources":$("#sources").val()
		};
		Api.saveSolution(uuid,msg)
		.then(function(){
			Api.submitSolution(uuid)
			.then(function(){
				alert("Abgegeben");
				window.location = '#/Konto'
			})
			.catch(function(res){
				console.log(res)
				alert("Da lief was schief: "+res.data[0].message)
			})
		})
		.catch(function(res){
			console.log(res)
			alert("Da lief was schief: "+res.data[0].message)
		})
	})
	
	
	
}]);