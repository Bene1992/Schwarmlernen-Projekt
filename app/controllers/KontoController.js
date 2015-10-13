var app = angular.module('slApp');

//Username: kocuqur Passwort: davehum

app.controller('KontoController',['$scope','Api','$routeParams','$cookies', function ($scope, Api,$routeParams,$cookies) {

	//entfernt die Buttons fals kein Admin
	var isAdmin = $cookies.get('isAdmin');
	if(isAdmin!='true'){
		$('.adminonly').remove();
	}

	//holt sich die self-Links
	Api.getSelf()
	.then( function (self){
		console.log(self)
		//holt sich das Arbeitspaket
		if(isAdmin=='false'){
			Api.getNodesByRef(self.data.workpackage)
			.then( function (workpackage){
				$('#selfpackage').append("<li style='background-color:grey' class='list-group-item' >Infos:<span class='form-control'> zu erledigen: "+workpackage.infos.todo+" erledigt: "+workpackage.infos.done+"</span></li>");
				$('#selfpackage').append("<li style='background-color:grey' class='list-group-item' >Bewertungen:<span class='form-control'> zu erledigen: "+workpackage.ratings.todo+" erledigt: "+workpackage.ratings.done+"</span></li>");
				$('#selfpackage').append("<li style='background-color:grey' class='list-group-item' >Loesungen:<span class='form-control'> zu erledigen: "+workpackage.solutions.todo+" erledigt: "+workpackage.solutions.done+"</span></li>");
				$('#selfpackage').append("<li style='background-color:grey' class='list-group-item' >Aufgaben:<span class='form-control'> zu erledigen: "+workpackage.tasks.todo+" erledigt: "+workpackage.tasks.done+"</span></li>");
			})
		}
		if(isAdmin=='true'){
			$('#selfpackage').append("<li style='background-color:grey' class='list-group-item' >Kein Paket als Admin</li>");
		}
		
		//holt sich das Punktekonto
		Api.getNodesByRef(self.data.points)
		.then( function (points){
			var spent =parseInt(points.data.spent);
			var gained=parseInt(points.data.gained);
			var balance = gained-spent;
			$('#selfpoints').append("<li style='background-color:grey' class='list-group-item' ><span class='form-control'> Erworben: "+points.data.gained+" Ausgegeben: "+points.data.spent+"</span></li>");
			$('#selfpoints').append("<li style='background-color:grey' class='list-group-item' ><span class='form-control'> Balance: "+balance+"</span></li>");
		})
		
		//holt den aktuellen Ruf
		Api.getNodesByRef(self.data.prestige)
		.then( function (prestige){
			console.log(prestige)	
			$('#selfprestige').append("<li style='background-color:grey' class='list-group-item' ><span class='form-control' >"+prestige.data.prestige+"</span></li>");
		})
		
		//holt dich die erstellten Infos
		Api.getNodesByRef(self.data.infos.finished)
		.then( function (infos){
			jQuery.each(infos.data,function () {
				$('#selfinfos').append("<li id='in-li"+this.properties.uuid+"' style='background-color:grey' class='list-group-item' ><span class='form-control' ><a href='#/info"+this.properties.uuid+"'>"+this.properties.description+"</a></span></li>");
			})
		})
		
		//holt dich die erstellten Infos unfinished
		Api.getNodesByRef(self.data.infos.unfinished)
		.then( function (infos){
			jQuery.each(infos.data,function () {
				$('#selfinfosunfinished').append("<li id='in-li"+this.properties.uuid+"' style='background-color:grey' class='list-group-item' ><span class='form-control' ><a href='#/unfinishedinfo"+this.properties.uuid+"'>"+this.properties.description+"</a></span></li>");
			})
		})
		
		//holt sich die Lösungen
		Api.getNodesByRef(self.data.solutions.finished)
		.then( function (solutions){
			jQuery.each(solutions.data,function () {
				$('#selfsolutions').append("<li id='so-li"+this.properties.uuid+"' style='background-color:grey' class='list-group-item' ><span class='form-control' ><a href='#/solution"+this.properties.uuid+"'>"+this.properties.description+"</a></span></li>");
			})
		})
		
		//holt sich die Lösungen unfinished
		Api.getNodesByRef(self.data.solutions.unfinished)
		.then( function (solutions){
			jQuery.each(solutions.data,function () {
				$('#selfsolutionsunfinished').append("<li id='so-li"+this.properties.uuid+"' style='background-color:grey' class='list-group-item' ><span class='form-control' ><a href='#/unfinishedsolution"+this.properties.uuid+"'>"+this.properties.description+"</a></span></li>");
			})
		})
		
		//holt sich die erstellten Aufgaben
		Api.getNodesByRef(self.data.tasks.created.finished)
		.then( function (created){
			console.log(created)
			jQuery.each(created.data,function () {
				$('#selfcreated').append("<li id='tac-li"+this.properties.uuid+"' style='background-color:grey' class='list-group-item' ><span class='form-control' ><a href='#/task"+this.properties.uuid+"'>"+this.properties.description+"</a></span></li>");
			})
		})
		
		//holt sich die erstellten Aufgaben unfinished
		Api.getNodesByRef(self.data.tasks.created.unfinished)
		.then( function (created){
			jQuery.each(created.data,function () {
				$('#selfcreatedunfinished').append("<li id='tac-li"+this.properties.uuid+"' style='background-color:grey' class='list-group-item' ><span class='form-control' ><a href='#/unfinishedtask"+this.properties.uuid+"'>"+this.properties.description+"</a></span></li>");
			})
		})
		
		//holt sich die gelösten Aufgaben
		Api.getNodesByRef(self.data.tasks.solved)
		.then( function (solved){
			jQuery.each(solved.data,function () {
				$('#selfsolved').append("<li id='tas-li"+this.properties.uuid+"' style='background-color:grey' class='list-group-item' ><span class='form-control' ><a href='#/task"+this.properties.uuid+"'>"+this.properties.description+"</a></span></li>");
			})
		})
	})

	
}]);