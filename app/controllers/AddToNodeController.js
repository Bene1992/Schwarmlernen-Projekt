var app = angular.module('slApp');

app.controller('AddToNodeController',['$scope','Api','$routeParams','$cookies', function ($scope, Api,$routeParams,$cookies) {	

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
		
		
	
		//Verschiedne Formulare
		switch(selectedType) {
    	case '1': // Lernziel
    		$('.formularbauteil').remove();
    	    $('#formular').append('<input class="form-control formularbauteil" id="name" type="text" class="form-control" placeholder="Lernziel" ></input>');
    	    $('#submit').off('click');
    	    $('#submit').click(function () {
				msg= {"name":$('#name').val()};
				Api.postTarget(msg,parentID)
					window.location = 'http://maximumstock.net/sl/#/Lernziele';
			});
    	    
    	    break;
    	case '2': // Aufgabe
    		$('.formularbauteil').remove();
    		$('#formular').append('<input class="form-control formularbauteil" id="description" type="text" class="form-control" placeholder="Aufgabenstellung" ></input>');
    	    $('#submit').off('click');
    	    $('#submit').click(function () {
				msg= {"description":$('#description').val()};
				Api.postTask(msg,parentID)
					window.location = 'http://maximumstock.net/sl/#/Lernziele';
			});
    	    
    	    break;
    	case '3': // Info
    	    $('.formularbauteil').remove();
    		$('#formular').append('<input class="form-control formularbauteil" id="description" type="text" class="form-control" placeholder="Information" ></input>');
    	    $('#submit').off('click');
    	    $('#submit').click(function () {
				msg= {"description":$('#description').val()};
				Api.postInfo(msg,parentID)
					window.location = 'http://maximumstock.net/sl/#/Lernziele';
			});
    	    
    	    break;
    
		}
	
});
	
	

	
	

}]);