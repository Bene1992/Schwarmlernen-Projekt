var app = angular.module('slApp', ['ngRoute']);

//This configures the routes and associates each route with a view and a controller
app.config(['$routeProvider',function ($routeProvider) {
    $routeProvider
        .when('/Startseite',
            {
                controller: '',
                templateUrl: 'app/partials/Startseite.html'
            })
        .when('/Lernziele',
            {
                controller: 'easyController',
                templateUrl: 'app/partials/Lernziele.html'
            })
       
        .otherwise({ redirectTo: 'app/partials/Startseite.html' });
}]);