var app = angular.module('slApp');

app.controller('AddToTargetController',['$scope','Api','$routeParams','$cookies', function ($scope, Api,$routeParams,$cookies) {	

	var parentID = $routeParams.uuid;
	var selectedType = $('#typeselect').val();
	
	$('#submit').click(function(){ });
	
	
	//entfernt die Buttons fals kein Admin
	var isAdmin = $cookies.get('isAdmin');
	if(isAdmin!='true'){
		$('.adminonly').remove();
	}
	
	//Auswahl was hinzugefügt werden soll
	$('#typeselect').on('change',function (){
		var selectedType = $('#typeselect').val();
		
		
		//Bildschirmbreite
		var editorwidth = $('.list-group-item').width();		
	
		//Verschiedne Formulare
		switch(selectedType) {
    	case '1': // Lernziel
    		$('.formularbauteil').remove();
    		$(".markitup").remove();
    	    $('#formular').append('<textarea class="form-control formularbauteil" id="name" type="text" class="form-control" placeholder="Lernziel" ></textarea>');
    	    $('#submit').off('click');
    	    
    	    //initialisiert Texteditor
			$("#name").markItUp(mySettings);
			
			//legt Breite des Editors fest
			$(".markitup").width(editorwidth);
			$("textarea").width($('.markitupcontainer').width()-50);
    	    
    	    $('#submit').click(function () {
				msg=	{	"name":$('#name').val()};
				Api.postTarget(msg,parentID)
				.then(function(){
					alert("Erfolg");
					window.location = 'http://maximumstock.net/sl/#/Lernziele'
				})
				.catch(function(res){
					alert(res);
				})
			});
    	    
    	    break;
    	case '2': // Aufgabe
    		$('.formularbauteil').remove();
    		$(".markitup").remove();
    		$('#formular').append('<textarea class="form-control formularbauteil" id="description" type="text" class="form-control" placeholder="Ueberschrift" ></textarea>');
    		$('#formular').append('<textarea class="form-control formularbauteil" id="text" type="text" class="form-control" placeholder="Aufgabenstellung" ></textarea>');
    		$('#formular').append('<textarea class="form-control formularbauteil" id="sources" type="text" class="form-control" placeholder="Quellen" ></textarea>');
    	   
    	    $('#submit').off('click');
    	    $('#save').off('click');
    	    
    	    //initialisiert Texteditor
			$("#description").markItUp(mySettings);
			$("#text").markItUp(mySettings);
			$("#sources").markItUp(mySettings);
			
			//legt Breite des Editors fest
			$(".markitup").width(editorwidth);
			$("textarea").width($('.markitupcontainer').width()-50);
    	    
    	    //Speichert die Aufgabe im Konto
    	    $('#save').click(function () {
				msg=	{	"description":$('#description').val(),
							"text":$('#text').val(),
							"sources":$('#sources').val()
						};
				Api.postTask(msg,parentID)
				.then(function(res){
					console.log(res);
					alert("Im Konto gespeichert");
					window.location = 'http://maximumstock.net/sl/#/Konto';
				})
				.catch(function(res){
					alert("Fehler: "+res.data.message)
				})
			});
			
			$('#submit').click(function () {
				msg=	{	"description":$('#description').val(),
							"text":$('#text').val(),
							"sources":$('#sources').val()
						};
				Api.postTask(msg,parentID)
				.then(function(res){
					Api.submitTask(res.data.properties.uuid)
					.then(function(){
						alert("Aufgabe wurde abgegeben");
						window.location = 'http://maximumstock.net/sl/#/Lernziele';
					})
					.catch(function(){
						alert("Fehler: "+res.data.message);
					})
				})
				.catch(function(res){
					alert("Fehler: "+res.data.message)
				})
			});
    	    
    	    break;
    	case '3': // Info
    	    $('.formularbauteil').remove();
    	    $(".markitup").remove();
    		$('#formular').append('<textarea class="form-control formularbauteil" id="description" type="text" class="form-control" placeholder="Ueberschrift" ></textarea>');
    		$('#formular').append('<textarea class="form-control formularbauteil" id="text" type="text" class="form-control" placeholder="Information" ></textarea>');
    		$('#formular').append('<textarea class="form-control formularbauteil" id="sources" type="text" class="form-control" placeholder="Quellen" ></textarea>');
    	    
    	    $('#submit').off('click');
    	    $('#save').off('click');
    	    
    	    //initialisiert Texteditor
			$("#description").markItUp(mySettings);
			$("#text").markItUp(mySettings);
			$("#sources").markItUp(mySettings);
			
			//legt Breite des Editors fest
			$(".markitup").width(editorwidth);
			$("textarea").width($('.markitupcontainer').width()-50);
    	    
    	    //Speichert die Info im Konto
    	    $('#save').click(function () {
				msg=	{	"description":$('#description').val(),
							"text":$('#text').val(),
							"sources":$('#sources').val()
						};
				Api.postInfo(msg,parentID)
				.then(function(res){
					alert("Im Konto gespeichert");
					window.location = 'http://maximumstock.net/sl/#/Konto';
				})
				.catch(function(res){
					alert("Fehler: "+res.data.message);
				})
			});
			
			//Gibt die Info ab 
			$('#submit').click(function () {
				msg=	{	"description":$('#description').val(),
							"text":$('#text').val(),
							"sources":$('#sources').val()
						};
				Api.postInfo(msg,parentID)
				.then(function(res){
					Api.submitInfo(res.data.properties.uuid)
					.then(function(){
						alert("Info wurde abgegeben");
						window.location = 'http://maximumstock.net/sl/#/Lernziele';
					})
					.catch(function(){
						alert("Fehler: "+res.data.message);
					})
				})
				.catch(function(res){
					alert("Fehler: "+res.data.message);
				})
			});
    	    
    	    break;
		}
	});
}]);