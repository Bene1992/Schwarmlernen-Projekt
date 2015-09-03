var app = angular.module('slApp', ['ngRoute']);

//This configures the routes and associates each route with a view and a controller
app.config(['$routeProvider',function ($routeProvider) {
    $routeProvider
        .when('/Startseite',
            {
                controller: 'StartseiteController',
                templateUrl: 'app/partials/Startseite.html'
            })
        .when('/Lernziele',
            {
                controller: 'LernzielController',
                templateUrl: 'app/partials/Lernziele.html'
            })
        .when('/Konto',
            {
                controller: 'KontoController',
                templateUrl: 'app/partials/Konto.html'
            })
        .when('/ToDo',
            {
                controller: 'ToDoController',
                templateUrl: 'app/partials/ToDo.html'
            })
        .when('/Abmelden',
            {
                controller: 'AbmeldenController',
                templateUrl: 'app/partials/Abmelden.html'
            })
       
        .otherwise({ redirectTo: 'app/partials/Startseite.html' });
}]);