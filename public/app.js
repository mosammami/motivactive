var app = angular.module('App', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider

	// route for the home page
	.when('/', {
		templateUrl: 'pages/home.html',
		controller: 'mainController',
	})

	// route for the about page
	.when('/about', {
		templateUrl : 'pages/about.html',
		controller  : 'aboutController'
	})

	// route for the contact page
	.when('/contact', {
		templateUrl : 'pages/contact.html',
		controller  : 'contactController'
	})

	// route for anything else that user writes to URI
	.otherwise({redirectTo: '/'});
});
