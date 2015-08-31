var app = angular.module('slApp', ['ngRoute']);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider) {
    $routeProvider
        .when('/',
            {
                controller: 'easyController',
                templateUrl: 'app/partials/view1.html'
            })
       
        .otherwise({ redirectTo: 'app/partials/view1.html' });
});