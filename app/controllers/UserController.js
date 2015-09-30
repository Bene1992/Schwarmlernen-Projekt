var app = angular.module('slApp');

app.controller('UserController',['$scope','Api','$routeParams','$cookies', function ($scope, Api,$routeParams,$cookies) {

	//entfernt die Buttons fals kein Admin
	var isAdmin = $cookies.get('isAdmin');
	if(isAdmin!='true'){
		$('.adminonly').remove();
	}

	//holt alle Studiengänge
	Api.getAllDegrees()
	.then (function(deg) {
		jQuery.each(deg,function () {
			var parentID = this.properties.uuid;
			$('#degreelist').append("<li style='background-color:grey' class='list-group-item' id='"+this.properties.uuid+"' >"+this.properties.name+"</li><ul id='ul"+this.properties.uuid+"'  ></ul>");
			$('#'+this.properties.uuid).append("<button class='btn btn-default addbutton' id='createUserFor"+this.properties.uuid+"' >Add User</button>");
		
			//holt alle User des Studiengangs
			Api.getNodesByRef(this.links.users)
			.then(function (user){
				jQuery.each(user,function () {
					//User darstellen
					$('#ul'+parentID).append("<li style='background-color:grey' class='list-group-item id='"+this.properties.uuid+"' >"+this.properties.username+"</li>");
				})
				
			})
		
		//leitet auf AddUser Seite weiter
		$('.addbutton').click(function(){ window.location = 'http://maximumstock.net/sl/#/'+this.id});
		})
	})

	

}]);