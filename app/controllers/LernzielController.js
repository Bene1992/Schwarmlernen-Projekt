var app = angular.module('slApp');

app.controller('LernzielController',['$scope','Api','$cookies', function ($scope, Api,$cookies) {

	//entfernt die Buttons fals kein Admin
	var isAdmin = $cookies.get('isAdmin');

		
	if(isAdmin!='true'){
		$('.adminonly').remove();
	}
    
    
    //Erstellt Studiengang und Module
	Api.getAllTargets()
	.then (function(mainTargets) {
		console.log(mainTargets);
		jQuery.each(mainTargets.data, function() {
			$('#root').append("<li id = 'de-li"+this.properties.uuid+"' class='list-group-item' ><span class='form-control' >"+this.properties.name+"</span></li><ul id = '"+this.properties.uuid+"'></ul>");
			$('#de-li'+this.properties.uuid).append("<button  class='adminonly addbutton btn btn-default' id = 'addToDegree"+this.properties.uuid+"'>Add</button>");
			var parentID = this.properties.uuid;
			
			Api.getNodesByRef(this.links.children)
			.then (function(children) {
				console.log(children)
				jQuery.each(children.data.targets, function() {
      				$('#'+parentID).append("<li  class='list-group-item '  id = 'no-li"+this.properties.uuid+"' ><span class='form-control' >"+this.properties.name+"</span></li><ul id = 'ul"+this.properties.uuid+"'></ul>");
       				$('#no-li'+this.properties.uuid).append("<button  class='openbutton btn btn-default' id = '"+this.properties.uuid+"'>Open</button>");
       				$('#no-li'+this.properties.uuid).append("<button  class='addbutton btn btn-default' id = 'addToTarget"+this.properties.uuid+"'>Add</button>");
       				$('#no-li'+this.properties.uuid).append("<button  class='adminonly configbutton btn btn-default' id='config"+this.properties.uuid+"'>Config</button>");
   				})
   				$(".openbutton" ).off("click");
   				$(".openbutton").click(getChildrenOnClick);
   				$('.addbutton').click(function(){ window.location = 'http://maximumstock.net/sl/#/'+this.id});
   				$('.configbutton').click(function(){ window.location = 'http://maximumstock.net/sl/#/'+this.id});
   				if(isAdmin=='false'){
					$('.adminonly').remove();
				}
			})
		})
	})
	.catch (function(data){
		console.log(data);
	})
    
    //liefert auf Klick die jeweils darunter liegenden 	Kinder
    var getChildrenOnClick = function () {
   		var parentID = this.id;
   		this.remove();
   		$( ".openbutton" ).off("click");
	
  		Api.getNodesByRef("http://maximumstock.net/schwarmlernen/api/v1/targets/"+this.id+"/children")
		.then (function(children) {
			//hängt targets an
			console.log(children);
			jQuery.each(children.data.targets, function() {
       			$('#ul'+parentID).append("<li style='background-color:grey' class='list-group-item ' id = 'no-li"+this.properties.uuid+"' ><span class='form-control' >"+this.properties.name+"</span></li><ul id = 'ul"+this.properties.uuid+"'></ul>");
       			$('#no-li'+this.properties.uuid).append("<button  class='openbutton btn btn-default' id = '"+this.properties.uuid+"'>Open</button>");
       			$('#no-li'+this.properties.uuid).append("<button  class='addbutton btn btn-default' id = 'addToTarget"+this.properties.uuid+"'>Add</button>");
       			$('#no-li'+this.properties.uuid).append("<button  class='adminonly configbutton btn btn-default' id='config"+this.properties.uuid+"'>Config</button>");
   			})
   		
   			//Hängt tasks an 
   			jQuery.each(children.data.tasks, function() {
       			if(this.properties.status=="active"){
       				$('#ul'+parentID).append("<li style='background-color:47BCF7' class='list-group-item ' id = 'ta-li"+this.properties.uuid+"' ><span class='form-control' ><a href='#/task"+this.properties.uuid+"'>"+this.properties.description+"</a><span></li><ul id = 'ul"+this.properties.uuid+"'></ul>");
       				$('#ta-li'+this.properties.uuid).append("<button  class='adminonly ta-delete btn btn-default' id = '"+this.properties.uuid+"'>Toggle</button>");
       			}
       			if(this.properties.status=="inactive"){
       				$('#ul'+parentID).append("<li style='background-color:red' class='adminonly list-group-item ' id = 'ta-li"+this.properties.uuid+"' ><span class='form-control' ><a href='#/task"+this.properties.uuid+"'>"+this.properties.description+"</a><span></li><ul id = 'ul"+this.properties.uuid+"'></ul>");
       				$('#ta-li'+this.properties.uuid).append("<button  class='adminonly ta-delete btn btn-default' id = '"+this.properties.uuid+"'>Toggle</button>");
       			}
   			})
   			
   		 	//Hängt infos an 
   			jQuery.each(children.data.infos, function() {
       			if(this.properties.status=="active"){
       				$('#ul'+parentID).append("<li style='background-color:81F79F' class='list-group-item ' id = 'in-li"+this.properties.uuid+"' ><span class='form-control' ><a href='#/info"+this.properties.uuid+"'>"+this.properties.description+"</a></span></li><ul id = 'ul"+this.properties.uuid+"'></ul>");
					$('#in-li'+this.properties.uuid).append("<button  class='adminonly in-delete btn btn-default' id = '"+this.properties.uuid+"'>Toggle</button>");
       			}
       			if(this.properties.status=="inactive"){
       				$('#ul'+parentID).append("<li style='background-color:red' class='adminonly list-group-item ' id = 'in-li"+this.properties.uuid+"' ><span class='form-control' ><a href='#/info"+this.properties.uuid+"'>"+this.properties.description+"</a></span></li><ul id = 'ul"+this.properties.uuid+"'></ul>");
					$('#in-li'+this.properties.uuid).append("<button  class='adminonly in-delete btn btn-default' id = '"+this.properties.uuid+"'>Toggle</button>");
       			}
        			
   			})
		
			if(isAdmin=='false'){
				$('.adminonly').remove();
			}
			$('.openbutton').off('click');
   			$('.openbutton').click(getChildrenOnClick);
   			//Leitet auf die AddTo*.hmtl weiter
   			$('.addbutton').click(function(){ window.location = '#/'+this.id});
   			$('.configbutton').click(function(){ window.location = '#/'+this.id});

   			
   			//toggelt die Aufgaben   			
   			$('.in-delete').click(function(){
   				Api.deleteInfo(this.id)
   				.then(function(){
   				   	location.reload();
   				})
   			})
   			
   			//toggelt die Aufgaben
   			$('.ta-delete').click(function(){
   				Api.deleteTask(this.id)
   				.then(function(){
   				   	location.reload();
   				})
   			})	
   		})	
	};
   	
   

	
							
   	
		
	
	
		
	
}]);
