var app = angular.module('slApp');

app.controller('KontoController',['$scope','Api','$routeParams','$cookies', function ($scope, Api,$routeParams,$cookies) {

	//entfernt die Buttons fals kein Admin
	var isAdmin = $cookies.get('isAdmin');
		
	if(isAdmin!='true'){
		$('.adminonly').remove();
	}

	//Username: nibosog Passwort: wuqunok
	
	Api.getSelf()
	.then( function (self){
		Api.getNodesByRef(self.data.workpackage)
		.then( function (workpackage){
			if(isAdmin=='false'){
				$('#selfpackage').append("<li style='background-color:grey' class='list-group-item' >Infos:<span class='form-control'> zu erledigen: "+workpackage.infos.todo+" erledigt: "+workpackage.infos.done+"</span></li>");
				$('#selfpackage').append("<li style='background-color:grey' class='list-group-item' >Bewertungen:<span class='form-control'> zu erledigen: "+workpackage.ratings.todo+" erledigt: "+workpackage.ratings.done+"</span></li>");
				$('#selfpackage').append("<li style='background-color:grey' class='list-group-item' >Loesungen:<span class='form-control'> zu erledigen: "+workpackage.solutions.todo+" erledigt: "+workpackage.solutions.done+"</span></li>");
				$('#selfpackage').append("<li style='background-color:grey' class='list-group-item' >Aufgaben:<span class='form-control'> zu erledigen: "+workpackage.tasks.todo+" erledigt: "+workpackage.tasks.done+"</span></li>");
			}
			if(isAdmin=='true'){
				$('#selfpackage').append("<li style='background-color:grey' class='list-group-item' >Kein Paket als Admin</li>");
			}
		})
		Api.getNodesByRef(self.data.points)
		.then( function (points){
			console.log(points)
			var spent =parseInt(points.total.spent);
			var gained=parseInt(points.total.gained);
			var balance = gained-spent;
			$('#selfpoints').append("<li style='background-color:grey' class='list-group-item' >Infos:<span class='form-control'> Erworben: "+points.infos.gained+" Ausgegeben: "+points.infos.spent+"</span></li>");
			$('#selfpoints').append("<li style='background-color:grey' class='list-group-item' >Bewertungen:<span class='form-control'> Erworben: "+points.ratings.gained+" Ausgegeben: "+points.ratings.spent+"</span></li>");
			$('#selfpoints').append("<li style='background-color:grey' class='list-group-item' >Loesungen:<span class='form-control'> Erworben: "+points.solutions.gained+" Ausgegeben: "+points.solutions.spent+"</span></li>");
			$('#selfpoints').append("<li style='background-color:grey' class='list-group-item' >Aufgaben:<span class='form-control'> Erworben: "+points.tasks.gained+" Ausgegeben: "+points.tasks.spent+"</span></li>");
			$('#selfpoints').append("<li style='background-color:grey' class='list-group-item' >Total:<span class='form-control'> Erworben: "+points.total.gained+" Ausgegeben: "+points.total.spent+"</span></li>");
			$('#selfpoints').append("<li style='background-color:grey' class='list-group-item' >Balance:<span class='form-control'> "+balance+"</span></li>");
		})
		Api.getNodesByRef(self.data.infos)
		.then( function (infos){
			jQuery.each(infos,function () {
				if(this.properties.status=="active"){
					$('#selfinfos').append("<li id='in-li"+this.properties.uuid+"' style='background-color:grey' class='list-group-item' ><span class='form-control' ><a href='/sl/#/info"+this.properties.uuid+"'>"+this.properties.description+"</a></span></li>");
				}
				if(this.properties.status=="inactive"){
					$('#selfinfos').append("<li id='in-li"+this.properties.uuid+"' style='background-color:red' class='list-group-item' ><span class='form-control' ><a href='/sl/#/info"+this.properties.uuid+"'>"+this.properties.description+"</a></span></li>");
				}
				$('#in-li'+this.properties.uuid).append("<button  class=' in-delete btn btn-default' id = '"+this.properties.uuid+"'>Toggle</button>");
			})
			$('.in-delete').click(function(){
   				Api.deleteInfo(this.id)
   				.then(function(){
   				   	location.reload();
   				})
   			})
		})
		Api.getNodesByRef(self.data.solutions)
		.then( function (solutions){
			jQuery.each(solutions,function () {
				if(this.properties.status=="active"){
					$('#selfsolutions').append("<li id='so-li"+this.properties.uuid+"' style='background-color:grey' class='list-group-item' ><span class='form-control' ><a href='/sl/#/solution"+this.properties.uuid+"'>"+this.properties.description+"</a></span></li>");
				}
				if(this.properties.status=="inactive"){
					$('#selfsolutions').append("<li id='so-li"+this.properties.uuid+"' style='background-color:red' class='list-group-item' ><span class='form-control' ><a href='/sl/#/solution"+this.properties.uuid+"'>"+this.properties.description+"</a></span></li>");
				}
				$('#so-li'+this.properties.uuid).append("<button  class=' so-delete btn btn-default' id = '"+this.properties.uuid+"'>Toggle</button>");
			})
			$('.so-delete').click(function(){
   				Api.deleteSolution(this.id)
   				.then(function(res){
   					console.log(res);
   				   	location.reload();
   				})
   			})
		})
		Api.getNodesByRef(self.data.tasks.created)
		.then( function (created){
			jQuery.each(created,function () {
				if(this.properties.status=="active"){
					$('#selfcreated').append("<li id='tac-li"+this.properties.uuid+"' style='background-color:grey' class='list-group-item' ><span class='form-control' ><a href='/sl/#/task"+this.properties.uuid+"'>"+this.properties.description+"</a></span></li>");
				}
				if(this.properties.status=="inactive"){
					$('#selfcreated').append("<li id='tac-li"+this.properties.uuid+"' style='background-color:red' class='list-group-item' ><span class='form-control' ><a href='/sl/#/task"+this.properties.uuid+"'>"+this.properties.description+"</a></span></li>");
				}
				$('#tac-li'+this.properties.uuid).append("<button  class=' ta-delete btn btn-default' id = '"+this.properties.uuid+"'>Toggle</button>");
			})
			$('.ta-delete').click(function(){
   				Api.deleteTask(this.id)
   				.then(function(){
   				   	location.reload();
   				})
   			})
		})
		Api.getNodesByRef(self.data.tasks.solved)
		.then( function (solved){
			jQuery.each(solved,function () {
				$('#selfsolved').append("<li id='tas-li"+this.properties.uuid+"' style='background-color:grey' class='list-group-item' ><span class='form-control' ><a href='/sl/#/task"+this.properties.uuid+"'>"+this.properties.description+"</a></span></li>");
			})
		})
	})

	
}]);