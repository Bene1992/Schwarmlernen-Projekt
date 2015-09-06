var app = angular.module('slApp');

app.controller('AddToTargetController',['$scope','Api','$routeParams', function ($scope, Api,$routeParams) {	

	var parentID = $routeParams.uuid;
	var selectedType = $('#typeselect').val();
	 
	
	
	
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
				Api.postTarget(msg);
			});
    	    
    	    break;
    	case '2': // Aufgabe
    		$('.formularbauteil').remove();
    		$('#formular').append('<input class="formularbauteil" id="description" type="text" class="form-control" placeholder="Aufgabenstellung" ></input>');
    	    $('#submit').off('click');
    	    $('#submit').click(function () {
				msg= {"description":$('#description').val(),"parent":parentID};
				console.log(Api.postTask(msg));
			});
    	    
    	    break;
    	case '3': // Info
    	    $('#submit').off('click');
    	    
    	    break;
    	case '4': // Kommentar
    	    $('#submit').off('click');s
    	    
    	    break;
    
		}
	
});
	
	

	
	

}]);