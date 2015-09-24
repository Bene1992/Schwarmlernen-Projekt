var app = angular.module('slApp', ['ngRoute','ngCookies']);

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
        .when('/Abmelden',
            {
                controller: 'AbmeldenController',
                templateUrl: 'app/partials/Abmelden.html'
            })
        .when('/addToTask:uuid*',
            {
                controller: 'AddToNodeController',
                templateUrl: 'app/partials/AddToTask.html'
            })
        .when('/addToTarget:uuid*',
            {
                controller: 'AddToNodeController',
                templateUrl: 'app/partials/AddToTarget.html'
            })
        .when('/addToDegree:uuid*',
            {
                controller: 'AddModulController',
                templateUrl: 'app/partials/AddModul.html'
            })
        .when('/createUserFor:uuid*',
            {
                controller: 'AddUserController',
                templateUrl: 'app/partials/AddUser.html'
            })
        .when('/User',
            {
                controller: 'UserController',
                templateUrl: 'app/partials/User.html'
            })
        .when('/Login',
            {
                controller: 'AnmeldenController',
                templateUrl: 'app/partials/Anmelden.html'
            })
       	.when('/task:uuid*',
            {
                controller: 'TaskViewController',
                templateUrl: 'app/partials/TaskView.html'
            })
        .when('/info:uuid*',
            {
                controller: 'InfoViewController',
                templateUrl: 'app/partials/InfoView.html'
            })
        .when('/solution:uuid*',
            {
                controller: 'SolutionViewController',
                templateUrl: 'app/partials/SolutionView.html'
            })
        .when('/alter:uuid*',
            {
                controller: 'AlterController',
                templateUrl: 'app/partials/AlterView.html'
            })
        .when('/Admin',
            {
                controller: 'AdminPanelController',
                templateUrl: 'app/partials/AdminPanel.html'
            })
        .otherwise({ redirectTo: 'app/partials/Startseite.html' });
}]);