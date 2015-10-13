var app = angular.module('slApp');

app.controller('InfoUnfinishedController',['$scope','Api','$routeParams','$cookies', function ($scope, Api,$routeParams,$cookies) {

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
	Api.getInfo(uuid)
	.then(function(info){
		console.log(info)
		$("#description").val(info.data.properties.description);
		$("#text").val(info.data.properties.text);
		$("#sources").val(info.data.properties.sources);
	})
	.catch(function(){
		alert("Ups");
	})
	
	//Speichert Änderungen
	$('#save').click(function(){
		msg= {	"description":$('#description').val(),
				"text":$("#text").val(),
				"sources":$("#sources").val()
		};
		Api.saveInfo(uuid,msg)
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
		Api.saveInfo(uuid,msg)
		.then(function(){
			Api.submitInfo(uuid)
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