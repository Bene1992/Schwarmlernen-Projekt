var app = angular.module('slApp', ['ngRoute','ngCookies']);

//This configures the routes and associates each route with a view and a controller
app.config(['$routeProvider',function ($routeProvider) {
    $routeProvider
        .when('#/Startseite',
            {
                controller: 'StartseiteController',
                templateUrl: 'schwarmlernen/app/partials/Startseite.html'
            })
        .when('#/Lernziele',
            {
                controller: 'LernzielController',
                templateUrl: 'schwarmlernen/app/partials/Lernziele.html'
            })
        .when('#/Konto',
            {
                controller: 'KontoController',
                templateUrl: 'schwarmlernen/app/partials/Konto.html'
            })
        .when('#/Abmelden',
            {
                controller: 'AbmeldenController',
                templateUrl: 'schwarmlernen/app/partials/Abmelden.html'
            })
        .when('#/addToTask:uuid*',
            {
                controller: 'AddToTargetController',
                templateUrl: 'schwarmlernen/app/partials/AddToTask.html'
            })
        .when('#/addToTarget:uuid*',
            {
                controller: 'AddToTargetController',
                templateUrl: 'schwarmlernen/app/partials/AddToTarget.html'
            })
        .when('#/addToDegree:uuid*',
            {
                controller: 'AddModulController',
                templateUrl: 'schwarmlernen/app/partials/AddModul.html'
            })
        .when('#/createUserFor:uuid*',
            {
                controller: 'AddUserController',
                templateUrl: 'schwarmlernen/app/partials/AddUser.html'
            })
        .when('#/User',
            {
                controller: 'UserController',
                templateUrl: 'schwarmlernen/app/partials/User.html'
            })
        .when('#/Login',
            {
                controller: 'AnmeldenController',
                templateUrl: 'schwarmlernen/app/partials/Anmelden.html'
            })
       	.when('#/task:uuid*',
            {
                controller: 'TaskViewController',
                templateUrl: 'schwarmlernen/app/partials/TaskView.html'
            })
        .when('#/info:uuid*',
            {
                controller: 'InfoViewController',
                templateUrl: 'schwarmlernen/app/partials/InfoView.html'
            })
        .when('#/solution:uuid*',
            {
                controller: 'SolutionViewController',
                templateUrl: 'schwarmlernen/app/partials/SolutionView.html'
            })
        .when('#/unfinishedinfo:uuid*',
            {
                controller: 'InfoUnfinishedController',
                templateUrl: 'schwarmlernen/app/partials/InfoUnfinished.html'
            })
        .when('#/unfinishedsolution:uuid*',
            {
                controller: 'SolutionUnfinishedController',
                templateUrl: 'schwarmlernen/app/partials/SolutionUnfinished.html'
            })
        .when('#/unfinishedtask:uuid*',
            {
                controller: 'TaskUnfinishedController',
                templateUrl: 'schwarmlernen/app/partials/TaskUnfinished.html'
            })
        .when('#/config:uuid*',
            {
                controller: 'ConfigController',
                templateUrl: 'schwarmlernen/app/partials/Config.html'
            })
        .when('#/Admin',
            {
                controller: 'AdminPanelController',
                templateUrl: 'schwarmlernen/app/partials/AdminPanel.html'
            })
        .otherwise({ redirectTo: 'schwarmlernen/app/partials/Startseite.html' });
}]);