var app = angular.module('slApp');




app.controller('easyController',['$scope','$http','Api', function ($scope,$http, Api) {


	//https://www.jstree.com
	// 6 create an instance when the DOM is ready
    $('#jstree').jstree();
    // 7 bind to events triggered on the tree
    $('#jstree').on("changed.jstree", function (e, data) {
      console.log(data.selected);
	});
	
	$('#jstree').jstree(
    	{
			"core" : {
                "check_callback": true,
                },
            "plugins" : ["search", "sort"]
    	});
	
	
	console.log($('#jstree').jstree("create_node",[ '#', "Haalo"]));
	console.log($('#jstree').jstree().create_node('#', "Hallo", 'last'));
	console.log($('#jstree').jstree('create_node', '#', { 'attr' : { 'id' : '1' } , 'text' : "Bene"}, 'last'));
	console.log($('#jstree').jstree().create_node('#' , {'text':'new node', 'type':'valid_child'}));
	
	
	
	Api.getAllDegrees()
		.then (function(data) {
			jQuery.each(data, function() {
				console.log(this.properties.uuid);
       			$scope.Degree = this.properties.name;
				$('#jstree').jstree("create_node", '#', this.properties.name);
				Api.getTargetsByRef(this.ref+'/targets')
				.then (function(data2) {
					jQuery.each(data2, function() {
       					
       					
   					})
				})
			})
		})						
   		
		
	
	
		
	
}]);
