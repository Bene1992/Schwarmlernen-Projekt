var app = angular.module('slApp');

app.controller('KontoController',['$scope','Api','$routeParams','$cookies', function ($scope, Api,$routeParams,$cookies) {

	//entfernt die Buttons fals kein Admin
	var isAdmin = $cookies.get('isAdmin');
		
	if(isAdmin=='false'){
		$('.adminonly').remove();
	}

	//Username: nibosog Passwort: wuqunok
	
	Api.getSelf()
	.then( function (self){
		Api.getNodesByRef(self.data.workpackage)
		.then( function (workpackage){
			if(isAdmin=='false'){
				$('#selfpackage').append("<li style='background-color:grey' class='list-group-item' >Infos: zu erledigen: "+workpackage.infos.todo+" erledigt: "+workpackage.infos.done+"</li>");
				$('#selfpackage').append("<li style='background-color:grey' class='list-group-item' >Bewertungen: zu erledigen: "+workpackage.ratings.todo+" erledigt: "+workpackage.ratings.done+"</li>");
				$('#selfpackage').append("<li style='background-color:grey' class='list-group-item' >Loesungen: zu erledigen: "+workpackage.solutions.todo+" erledigt: "+workpackage.solutions.done+"</li>");
				$('#selfpackage').append("<li style='background-color:grey' class='list-group-item' >Aufgaben: zu erledigen: "+workpackage.tasks.todo+" erledigt: "+workpackage.tasks.done+"</li>");
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
			$('#selfpoints').append("<li style='background-color:grey' class='list-group-item' >Infos: Erworben: "+points.infos.gained+" Ausgegeben: "+points.infos.spent+"</li>");
			$('#selfpoints').append("<li style='background-color:grey' class='list-group-item' >Bewertungen: Erworben: "+points.ratings.gained+" Ausgegeben: "+points.ratings.spent+"</li>");
			$('#selfpoints').append("<li style='background-color:grey' class='list-group-item' >Loesungen: Erworben: "+points.solutions.gained+" Ausgegeben: "+points.solutions.spent+"</li>");
			$('#selfpoints').append("<li style='background-color:grey' class='list-group-item' >Aufgaben: Erworben: "+points.tasks.gained+" Ausgegeben: "+points.tasks.spent+"</li>");
			$('#selfpoints').append("<li style='background-color:grey' class='list-group-item' >Total: Erworben: "+points.total.gained+" Ausgegeben: "+points.total.spent+"</li>");
			$('#selfpoints').append("<li style='background-color:grey' class='list-group-item' >Balance: "+balance+"</li>");
		})
		Api.getNodesByRef(self.data.infos)
		.then( function (infos){
			jQuery.each(infos,function () {
				
				$('#selfinfos').append("<li style='background-color:grey' class='list-group-item' ><a href='/sl/#/info"+this.properties.uuid+"'>"+this.properties.description+"</a></li>");
			})
			
		})
		Api.getNodesByRef(self.data.solutions)
		.then( function (solutions){
			jQuery.each(solutions,function () {
				
				$('#selfsolutions').append("<li style='background-color:grey' class='list-group-item' ><a href='/sl/#/solution"+this.properties.uuid+"'>"+this.properties.description+"</a></li>");
			})
		})
		Api.getNodesByRef(self.data.tasks.created)
		.then( function (created){
			jQuery.each(created,function () {
				
				$('#selfcreated').append("<li style='background-color:grey' class='list-group-item' ><a href='/sl/#/task"+this.properties.uuid+"'>"+this.properties.description+"</a></li>");
			})
		})
		Api.getNodesByRef(self.data.tasks.solved)
		.then( function (solved){
			jQuery.each(solved,function () {
				
				$('#selfsolved').append("<li style='background-color:grey' class='list-group-item' ><a href='/sl/#/task"+this.properties.uuid+"'>"+this.properties.description+"</a></li>");
			})
		})
	})

	
}]);