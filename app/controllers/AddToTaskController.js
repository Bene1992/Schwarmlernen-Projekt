var app = angular.module('slApp');

app.controller('AddToTaskController',['$scope','Api','$routeParams', function ($scope, Api,$routeParams) {	

	var parentID = $routeParams.uuid;
	var selectedType = $('#typeselect').val();
	 
	
	
	
	//Auswahl was hinzugefügt werden soll
	$('#typeselect').on('change',function (){
		var selectedType = $('#typeselect').val();
		
		
	
		//Verschiedne Formulare
		switch(selectedType) {
    	case '1': // Lösung
    	    $('#submit').off('click');
    	    $('#formular').append('Loesung');
    	    /*$('#submit').click(function () {
				var name = $('#name').val();
				msg= "name:"+name+", parent:"+parentID;
				console.log(msg);
				Api.postNode(msg);
			});*/
    	    
    	    break;
    	case '2': // Kommentar
    	    $('#submit').off('Kommentar');
    	    $('#formular').append('Aufgabe');
    	    
    	    break;
    
		}
	
	});

}]);