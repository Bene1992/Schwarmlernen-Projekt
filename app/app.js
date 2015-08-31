var app = angular.module('slApp', ['ngRoute']);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider) {
    $routeProvider
        .when('/',
            {
                controller: 'easyController',
                templateUrl: '/Users/admin/Desktop/Studium/7. Semester/Schwarmlernen Projekt/app/partials/view1.html'
            })
       
        .otherwise({ redirectTo: '/Users/admin/Desktop/Studium/7. Semester/Schwarmlernen Projekt/app/partials/view1.html' });
});