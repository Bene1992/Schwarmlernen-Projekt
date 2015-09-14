var app = angular.module('slApp');

app.controller('AddToNodeController',['$scope','Api','$routeParams','$cookies', function ($scope, Api,$routeParams,$cookies) {	

	var parentID = $routeParams.uuid;
	var selectedType = $('#typeselect').val();
	
	$('#submit').click(function(){ });
	
	
	//entfernt die Buttons fals kein Admin
	var isAdmin = $cookies.get('isAdmin');
	console.log(isAdmin);
		
	if(isAdmin=='false'){
		$('.adminonly').remove();
	}
	
	//Auswahl was hinzugefügt werden soll
	$('#typeselect').on('change',function (){
		var selectedType = $('#typeselect').val();
		
		
	
		//Verschiedne Formulare
		switch(selectedType) {
    	case '1': // Node
    		$('.formularbauteil').remove();
    	    $('#formular').append('<input class="formularbauteil" id="name" type="text" class="form-control" placeholder="Name" ></input>');
    	    $('#submit').off('click');
    	    $('#submit').click(function () {
				msg= {"name":$('#name').val(),"parent":parentID};
				console.log(Api.postTarget(msg));
				window.location = 'http://maximumstock.net/sl/#/Lernziele'
			});
    	    
    	    break;
    	case '2': // Aufgabe
    		$('.formularbauteil').remove();
    		$('#formular').append('<input class="formularbauteil" id="description" type="text" class="form-control" placeholder="Aufgabenstellung" ></input>');
    	    $('#submit').off('click');
    	    $('#submit').click(function () {
				msg= {"description":$('#description').val(),"parent":parentID};
				console.log(Api.postTask(msg));
				window.location = 'http://maximumstock.net/sl/#/Lernziele'
			});
    	    
    	    break;
    	case '3': // Info
    	    $('.formularbauteil').remove();
    		$('#formular').append('<input class="formularbauteil" id="description" type="text" class="form-control" placeholder="Information" ></input>');
    	    $('#submit').off('click');
    	    $('#submit').click(function () {
				msg= {"description":$('#description').val(),"target":parentID};
				console.log(Api.postInfo(msg));
				window.location = 'http://maximumstock.net/sl/#/Lernziele'
			});
    	    
    	    break;
    	case '4': // Kommentar
    	    $('#submit').off('click');
    	    
    	    break;
    	case '5': // Lösung
    	    
    	    $('.formularbauteil').remove();
    		$('#formular').append('<input class="formularbauteil" id="description" type="text" class="form-control" placeholder="Lösung" ></input>');
    	    $('#submit').off('click');
    	    $('#submit').click(function () {
				msg= {"description":$('#description').val(),"task":parentID};
				console.log(Api.postSolution(msg));
				window.location = 'http://maximumstock.net/sl/#/Lernziele'
			});
    	    
    	    break;
    
		}
	
});
	
	

	
	

}]);