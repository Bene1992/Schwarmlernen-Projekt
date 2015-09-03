var app = angular.module('slApp');

app.controller('AddToNodeController',['$scope','Api','$routeParams', function ($scope, Api,$routeParams) {	

	var parentID = $routeParams.uuid;
	var selectedType = $('#typeselect').val();
	 
	
	
	
	//Auswahl was hinzugefügt werden soll
	$('#typeselect').on('change',function (){
		var selectedType = $('#typeselect').val();
		
		
	
		//Verschiedne Formulare
		switch(selectedType) {
    	case '1': // Node
    	    $('#submit').off('click');
    	    $('#formular').append('Node');
    	    $('#submit').click(function () {
				var name = $('#name').val();
				msg= "name:"+name+", parent:"+parentID;
				console.log(msg);
				Api.postNode(msg);
			});
    	    
    	    break;
    	case '2': // Aufgabe
    	    $('#submit').off('click');
    	    $('#formular').append('Aufgabe');
    	    
    	    break;
    	case '3': // Info
    	    $('#submit').off('click');
    	    $('#formular').append('Info');
    	    
    	    break;
    	case '4': // Kommentar
    	    $('#submit').off('click');
    	    $('#formular').append('Kommentar');
    	    
    	    break;
    
		}
	
	});
	
	

	
	

}]);